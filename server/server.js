var express = require('express');
var browserify = require('browserify-middleware');
var path = require('path');
var User = require('./models/users')
var Admin = require('./models/admins')
var UserSession = require('./models/userSessions')
var AdminSession = require('./models/adminSessions')

var app = express();

var port = process.env.PORT || 4000;

var assetFolder = path.join(__dirname, '..', 'client','public');

// Serve Static Assets
app.use(express.static(assetFolder));

app.use( require('body-parser').json() );

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
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  //now we want to add info to users db table
  User.create(name, email, password)
    .then((resp) => {
      res.send(201, resp)
    })
})