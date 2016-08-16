
var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/users');
var Session = require('./models/userSessions');
var Reservation = require('./models/reservations.js');
var Room = require('./models/rooms.js');
var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('cookie-session');
var MP = require('node-makerpass');
var client = require('./client_credentials');
var _ = require('lodash')


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
    clientID: client.ID,
    clientSecret: client.secret,
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
    res.redirect('/');
  });

io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');

  socket.on('newRoomStatus', function (data) {
    socket.broadcast.emit('updatedRooms', { rooms: data });
  });

  socket.on('tabletDisplay', function(data) {
  })

  socket.on('bookNow', function(roomId) {
    socket.broadcast.emit('instaBooked', roomId);
  })

  socket.on('unBook', function(roomId) {
    socket.broadcast.emit('roomUnBooked', roomId);
  })

  var date = new Date();
  var currentTime = date.getTime();
  var rooms;
  var resv;
  var roomsToClose = [];
  var bookedRooms = [];

  Reservation.findAllReservations()
  .then(reservationsData => {
    resv = reservationsData
    return Room.findRooms()
  })
  .then(data => {
    rooms = data
  })
  .then(() => {
    resv.forEach( x => {
      var resStart = x.startTime.getTime() + 18000000;
      var resEnd = x.endTime.getTime() + 18000000;
      var currRoom = rooms.find(findRoom)

      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === x.roomName;
      }

      if(resStart <= currentTime && currentTime <= resEnd) {
        bookedRooms.push(x.roomName)
        if(currRoom.isAvailable === true) {
          roomsToClose.push(x.roomName)
        }
      } else {
      }
    })
    console.log('booked rooms: ', bookedRooms)
  })
  .then(() => {
    var openRooms = rooms.map( room => room.roomName ).filter( x => !(bookedRooms.indexOf(x) >= 0))
    var roomsToOpen = []
    console.log('openRooms', openRooms)
    
    openRooms.forEach( room => {
      var currentRoom = rooms.find(findRoom)
      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === room;
      }
      if(currentRoom.isAvailable === false) {
        roomsToOpen.push(currentRoom.roomName)
      }
    })

    roomsToClose.forEach( room => {
      Room.changeAvailability(room)
      .then(() => console.log('changing status'))
    })
    roomsToOpen.forEach( room => {
      Room.changeAvailability(room)
      .then(() => console.log('changing status'))
    })
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

//<<<<<-------- AUTHENTICATION ENDPOINTS -------->>>>>\\

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
    //set cookie or session storage
    res.cookie("sessionId", sessionId)
    res.send(201, req.body.name)
  })
})

app.post('/login', function(req, res) {
  var userName;
  User.login(req.body)
  .then(user => {
    if(user === undefined){
      throw new Error("email is not in database, account not yet created")
    }
    if(!user){
      throw new Error("incorrect password")
    }
    else {
      userName = user.name
      return Session.create(user._id)
    }
  })
  .then(sessionId => {
    res.cookie("sessionId", sessionId)
    res.send(201, userName)
  })
  .catch(err => {
    res.send(400, err.toString())
  })
})

//<<<<<-------- ROOMS ENDPOINTS -------->>>>>\\

app.get('/check', MP.authWithSession(), function(req, res) {
  res.status(200).send(req.user)
})

app.post('/rooms/new', function(req, res) {
  Room.addRooms(req.body)
  .then((roomIds) => {
    res.send(201, {roomIds: roomIds});
  })
})

app.get('/logout', function(req, res){
  console.log('logging out')
  req.logout();
  res.redirect('/');
});

// should be a PUT

app.post('/:roomName/changeAvailability', MP.authWithSession(), function(req, res){
  Room.changeAvailability(req.params.roomName)
  .then(resp => {
    res.send(201, resp)
  })
})

app.get('/all-rooms', MP.authWithSession(), function(req, res){
  
  Room.findRooms()
  .then(roomInfo => {
    res.send(201, roomInfo)
  })
})

app.put('/room/edit/:id', function(req, res){
  var roomId = req.params.id
  //req.body should be new reservation info
  Room.updateRoom(roomId, req.body)
  .then(updatedRoom => {
    res.send(200, updatedRoom)
  })
})

// Delete room

app.delete('/:roomName', function(req, res){
  Room.deleteRoom(req.params.roomName)
  .then(resp => {
    res.send('Successfully deleted room')
  })
})


//<<<<<-------- RESERVATIONS ENDPOINTS -------->>>>>\\

app.get('/reservations', function(req, res){
  Reservation.findAllReservations()
  .then(reservationsData => {
    res.send(200, reservationsData)
  })
})

app.get('/reservations/:roomName', function(req, res){
  var name = req.params.roomName;
  Reservation.findByName(name)
  .then(reservations => {
    if(!reservations) {
      res.send(400, 'bad request')
    }
    res.send(200, reservations)
  })
})

// putting new reservations to the database
app.post('/reservations/new', function(req, res){ 
  
  Reservation.create(req.body)
  .then(reservationInfo => {
    res.send(201, reservationInfo)
  })
})

app.get('/reservations/:userId', function(req, res){
  var userId = req.params.userId;
  
  Reservation.findByUserId(userId)
  .then(reservations => {
    res.send(200, reservations)
  })
  .catch(err => {})
})

//update existing reservation
app.put('/reservations/:id', function(req, res){
  var resId = req.params.id
  //req.body should be new reservation info
  Reservation.updateReservation(resId, req.body)
  .then(updatedRes => {
    res.send(200, updatedRes)
  })
})

app.delete('/reservations/delete', function(req, res){

  Reservation.delete(req.body)
  .then(reservationInfo => {
    if(reservationInfo.n === 0){
      res.send(400, "reservations does not exist")
    }
    else{
      res.send(201, reservationInfo)
    }
  })
})

app.get('/timeSlots', function(req, res) {

  Reservation.findAllReservations()
  .then((reservationData) => {

    Reservation.makeSlots(reservationData)
    .then((timeSlots) => {
      res.send(200, timeSlots)
    })
  })
})

//endpoints for calendar asset-serving
app.get('*/lib/jquery.min.js', function(req, res){
  res.sendFile( path.join(__dirname,  '..', 'bower_components/jquery/dist/jquery.min.js') );
})

app.get('*/lib/moment.min.js', function(req, res){
  res.sendFile( path.join(__dirname,  '..', 'bower_components/moment/min/moment.min.js') );
})

app.get('*/fullcalendar/fullcalendar.js', function(req, res){
  res.sendFile( path.join(__dirname,  '..', 'bower_components/fullcalendar/dist/fullcalendar.js') );
})

app.get('*/fullcalendar/fullcalendar.css', function(req, res){
  res.sendFile( path.join(__dirname,  '..', 'bower_components/fullcalendar/dist/fullcalendar.css') );
})
// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

var port = process.env.PORT || 4000;

server.listen(port);
console.log('Listening on localhost:' + port);
module.exports = server
