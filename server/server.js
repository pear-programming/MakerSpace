var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var User = require('./models/users')
var Admin = require('./models/admins')
var Session = require('./models/userSessions')
var AdminSession = require('./models/adminSessions')

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

// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

// Start server
app.listen(port);
console.log('Listening on localhost:' + port);



//////// ENDPOINTS //////////

// new user signs up
app.post('/signup', function(req, res) {
  console.log('req.body: ', req.body)
  var user_id;
  //now we want to add info to users db table
  User.create(req.body)
  .then(userId => {
    user_id = userId
    return Session.create(userId)
  })
  .then(sessionId => {
    console.log('sending sessionId: ', sessionId)
    //set cookie or session storage
    res.cookie({sessionId: sessionId})
    res.send(201, user_id)
  })
})












