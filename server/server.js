var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/users');
var Admin = require('./models/admins');
var Session = require('./models/userSessions');
var AdminSession = require('./models/adminSessions');
var Organization = require('./models/organizations.js');
var Room = require('./models/rooms.js');

var app = express();

var port = process.env.PORT || 4000;

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

// Start server
app.listen(port);
console.log('Listening on localhost:' + port);



////???//// ENDPOINTS /???/////////

// new user signs up
app.post('/signup', function(req, res) { 

  var user_id;
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
    res.send(201, user_id)
  })
})




app.post('/login', function(req, res) {
  User.login(req.body)
  .then(userId => {
    // console.log('userId in server file: ', userId)
    if(userId === undefined){
      throw new Error("email is not in database, account not yet created")
    }
    if(!userId){
      throw new Error("incorrect password")
    }
    else {
      return Session.create(userId)
    }
  })
  .then(sessionId => {
    //set cookie or session storage
    res.cookie("sessionId", sessionId)
    res.send(201, "login success")
  })
  .catch(err => {
    res.send(400, err.toString())
  })
})



app.get('/logout', function(req, res) {
  Session.destroy(req.cookies.sessionId)
  .then(() => {
    res.clearCookie('sessionId');
    res.sendStatus(200);
  })
})



app.get('/rooms', function(req, res){
  Room.findRooms()
  .then(roomInfo => {
    res.send(201, roomInfo)
  })  
})


/*
  example room data: 
  [{
    roomName: 'name',
    capacity: 5,
    whiteboard: true,
    hammock: true,
    projector: false,
    isAvailable: true
  }]
*/

// Add a new room to database
app.post('/rooms/new', function(req, res) { 
  Room.addRooms(req.body)
  .then((roomIds) => {
    console.log("ready to send response after room insertion:", roomIds)
    res.send(201, {roomIds: roomIds});
  })
})



// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})
