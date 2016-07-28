var db = require('../db')
var uuid = require('node-uuid');


var Session = module.exports


Session.create = function (userId) { 

  console.log("in session.create: show userId", userId);

  var newSession = { id: uuid(), user_id: userId } 

  console.log("showing new session info:", newSession);

  return db.sessions.insert(newSession)
    .then((session) => {
      console.log('session inserted', session)
      return newSession
    })
    .catch(function(err) {
      return err;
    })
  }

Session.findById = function (sessionId) {

  return db.sessions.find({ id: sessionId })
    .then(function (rows) {
      return rows[0]
    })
  }

Session.destroy = function (sessionId) {
  return db.sessions.find({ id: sessionId }).del()
}