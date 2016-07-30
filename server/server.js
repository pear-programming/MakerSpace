var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/users');
var Session = require('./models/userSessions');
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



//////// ENDPOINTS //////////

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
});


//make new organization in db
app.post('/organization/new', function(req, res) {

  console.log("got new org request:", req.body, req.cookies.sessionId);
  var sessionId;
  var userId;
  Session.findById(req.cookies.sessionId)
    .then((session) => {
      userId = session.user_id;
      console.log("got to here!!!!!!:", session);
    Organization.findByName(req.body.name)
      .then((data) => {
        console.log("git data from findByName:", data);
        if(data[0]) {
          res.send(400, "organization already exists!");
        }
        else {
          console.log("made it to else!:", req.body, userId);
          Organization.create(req.body, userId)
            .then((data) => {
              Room.addRooms(data.rooms, data._id)
                .then((data) =>{

                  console.log("ready to send response after room insertion:", data)
                  res.send(201, "added organization and rooms successfully!");
                })
              // res.send(201, data)
            })
        }
      })
    })
  
});

app.get('/logout', function(req, res) {

  Session.destroy(req.cookies.sessionId)
    .then(() => {
      res.clearCookie('sessionId');
      res.sendStatus(200);
    })
})

// id, name, address, admin-id, info, rooms

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
    // console.log('sending sessionId: ', sessionId)
    //set cookie or session storage
    res.cookie("sessionId", sessionId)
    res.send(201, "login success")
  })
  .catch(err => {
    res.send(400, err.toString())
  })
});


// get all organizations in database
app.get('/organizations', function(req, res) {
  Organization.findAll()
  .then(orgs => {
    console.log('array of orgs?: ', orgs)
    res.send(200, orgs)
  })
});

app.get('/organizations/:organizationName', function(req, res) {
  var org = req.params.organizationName
  // console.log('org: ', org)
  Organization.findByName(org)
  .then(orgs => {
    console.log('org found: ', org)
    res.send(200, orgs)
  })
});


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})
