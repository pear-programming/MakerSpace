var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/users');
var Admin = require('./models/admins');
var Session = require('./models/userSessions');
var AdminSession = require('./models/adminSessions');
var Reservation = require('./models/reservations.js');
var Room = require('./models/rooms.js');
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('cookie-session');
var MP = require('node-makerpass');


app.use(session({
  name: 'my-app:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}));
//
// Now set up passport.
// Authenticate with MakerPass, and attach accessToken to session.
//
var passport = require('passport');
var MakerpassStrategy = require('passport-makerpass').Strategy;

passport.use(new MakerpassStrategy({
    clientID: 'eae6795ed5d6fe1fb29497641a083edb2c4fe242a233fc98138f7224177581e9',
    clientSecret: 'c92309a053636df7b24e1672ce6190ef9c76bca9e5aebf1cb8847e70607b534f',
    callbackURL: "http://localhost:4000/auth/makerpass/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {

    req.session.accessToken  = accessToken
    req.session.refreshToken = refreshToken
    done(null, 1) // Necessary only for serializeUser (see below)
  }
));

//
// Attach Passport to the app
//
app.use(passport.initialize())

//
// We don't need serializeUser/deserializeUser,
// but passport will break if we don't write this.
//
passport.serializeUser(function(_, done) { done(null, 1) })

//
// Direct your browser to this route to start the OAuth dance
//
app.get('/auth/makerpass',
  passport.authenticate('makerpass'));

//
// During the OAuth dance, MakerPass will redirect your user to this route,
// of which passport will mostly handle.
//
app.get('/auth/makerpass/callback',
  passport.authenticate('makerpass', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, do what you like at this point :)
    res.redirect('/rooms');
  });

io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');  

  socket.on('newRoomStatus', function (data) {
    socket.broadcast.emit('updatedRooms', { rooms: data });
  });

  socket.on('tabletDisplay', function(data) {
    console.log('data should be ex dee', data)
  })
});

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder));

app.use( require('body-parser').json() );

app.use(cookieParser());

// Serve JS Assets
app.get('/app-bundle.js',
 browserify('./client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
  })
);
//////// ENDPOINTS //////////

// new user signs up
app.post('/signup', function(req, res) {

  //now we want to add info to users db table
  User.create(req.body)
  .then(userId => {

    //new user was not created
    if(!userId){
      res.send(400, 'account already exists')
    } else {
      user_id = userId
      return Session.create(userId)
    }
  })
  .then(sessionId => {
    console.log('sending sessionId: ', sessionId)
    //set cookie or session storage
    res.cookie("sessionId", sessionId)
    res.send(201, req.body.name)
  })
})

// POST /rooms/new
//req.body should be be an array of room objects
// Example:
 // [
 //   {
 //      "roomName": "d",
 //      "projector": true,
 //      "capacity": 20
 //    },
 //    {
 //      "roomName": "e",
 //      "projector": false,
 //      "capacity": 25
 //    }
 //  ]

 app.get('/check', MP.authWithSession(), function(req, res) {
  res.status(200).send(req.user)
 })

app.post('/rooms/new', function(req, res) {

  Room.addRooms(req.body)
    .then((roomIds) => {

      console.log("ready to send response after room insertion:", roomIds)
      res.send(201, {roomIds: roomIds});
    })

})

app.get('/logout', function(req, res) {
  Session.destroy(req.cookies.sessionId)
    .then(() => {
      res.clearCookie('sessionId');
      res.sendStatus(200);
    })
})

app.post('/:roomName/changeAvailability', MP.authWithSession(), function(req, res){
  console.log('req.params.roomName: ', req.params.roomName)
  Room.changeAvailability(req.params.roomName)
  .then(resp => {
    console.log('resp in changeAvailability endpoint: ', resp)
    res.send(201, resp)
  })
})

app.get('/all-rooms', MP.authWithSession(), function(req, res){
  Room.findRooms()
  .then(roomInfo => {
    console.log(req.user)
    console.log(roomInfo)
    res.send(201, roomInfo)
  })
})
// putting new reservations to the database
app.post('/reservations/new', function(req, res){
  Reservation.create(req.body)
  .then(reservationInfo => {
    console.log("reservationInfo: ", reservationInfo)
    res.send(201, reservationInfo)
  })
})

// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

var port = process.env.PORT || 4000;

server.listen(port);
console.log('Listening on localhost:' + port);
