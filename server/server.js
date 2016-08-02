
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



io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');  

  socket.on('newRoomStatus', function (data) {
    socket.broadcast.emit('updatedRooms', { rooms: data });
  });
});

var port = process.env.PORT || 4000;

server.listen(port);
console.log('Listening on localhost:' + port);


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


app.get('/logout', function(req, res) {
  Session.destroy(req.cookies.sessionId)
  .then(() => {
    res.clearCookie('sessionId');
    res.sendStatus(200);
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

///////// ROOMS ENDPOINTS /////////

app.post('/rooms/new', function(req, res) {
  Room.addRooms(req.body)
  .then((roomIds) => {
    console.log("ready to send response after room insertion:", roomIds)
    res.send(201, {roomIds: roomIds});
  })
})

// should be a PUT

app.post('/:roomName/changeAvailability', function(req, res){
  console.log('req.params.roomName: ', req.params.roomName)
  Room.changeAvailability(req.params.roomName)
  .then(resp => {
    console.log('resp in changeAvailability endpoint: ', resp)
    res.send(201, resp)
  })
})

app.get('/all-rooms', function(req, res){
  Room.findRooms()
  .then(roomInfo => {
    res.send(201, roomInfo)
  })
})

// Update roomn -- post or put

// Delete room *********************************************

app.delete('/:roomName', function(req, res){
  // console.log('DELETE req.params.roomName: ', req.params.roomName)
  Room.deleteRoom(req.params.roomName)
  .then(resp => {
    console.log('Successfully deleted', req.params.roomName);
    res.send('Successfully deleted room')
    // res.send(201, resp)
  })
})


///////// RESERVATIONS ENDPOINTS /////////

app.get('/reservations', function(req, res){
  Reservation.findAllReservations()
  .then(reservationsData => {
    console.log('reservationsData: ', reservationsData)
    res.send(200, reservationsData)
  })
})


app.get('/reservations/:roomName', function(req, res){
  var name = req.params.roomName;
  console.log('name from params: ', name)
  Reservation.findByName(name)
  .then(reservations => {
    if(!reservations) {
      res.send(400, 'bad request')
    }
    console.log('reservations: ', reservations)
    res.send(200, reservations)
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
