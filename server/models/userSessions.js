var db = require('../db.js')
var uuid = require('node-uuid');


var Session = module.exports


Session.create = function (userId) { 
  var newSession = { _id: uuid(), user_id: userId } 

  console.log("showing new session info:", newSession);

  return db.userSessions.insert(newSession)
    .then(session => {
      console.log('session inserted', session)
      return session._id
    })
    .catch(function(err) {
      return err;
    })
  }

Session.findById = function (sessionId) {
  console.log("inside session.findById:", sessionId);
  return db.userSessions.find({ _id: sessionId })
    .then(function (rows) {
      console.log("found rows in session search:", rows);
      return rows[0]
    })
    .catch(function(err) {
      console.log("error retrieving from sessions:", err);
    })
  }

Session.destroy = function (sessionId) {
  return db.userSessions.find({ id: sessionId }).del()
}