var db = require('../db')
var uuid = require('node-uuid');


var Session = module.exports


Session.create = function (userId) { 

  var newSession = { _id: uuid(), user_id: userId } 

  console.log("showing new session info:", newSession);

  return db.userSessions.insert(newSession)
    .then((session) => {
      console.log('session inserted', session)
      return session._id
    })
    .catch(function(err) {
      return err;
    })
  }

Session.findById = function (sessionId) {

  return db.userSessions.find({ id: sessionId })
    .then(function (rows) {
      return rows[0]
    })
  }

Session.destroy = function (sessionId) {
  return db.userSessions.find({ id: sessionId }).del()
}