var db = require('../db')
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');


var User = module.exports


//creates a new user and inserts into db

User.create = function(incomingAttrs) {
  var attrs = Object.assign({}, incomingAttrs);
  //check if user already exists
  //if exists throw error, if not hash password
  return db.collection('users').find({email: attrs.email})
  .then(users => {
    if(users[0]){
      throw new Error('account already exists');
    } else {
      return hashPassword(attrs.password)
    }
  })
  .then(passwordHash => {
    attrs.password = passwordHash;
    return db.collection('users').insert(attrs)
  })
  .then(resp => {
    return resp._id
  })
  .catch(err => console.log('err in create: ', err))
}


//existing user logs in
User.login = function(loginInfo) {
 
  var attemptedPassword = loginInfo.password
  var user;
  return db.collection('users').find({email: loginInfo.email})
  .then(users => {
    if(users.length===0){
      throw new Error()
    }
    user = users[0];
    return comparePassword(users[0].password, attemptedPassword)
  })
  .then(resp => {
    if(resp){
     return user;
    } else {
     return false
    };
  })
  .catch(err => console.log('user not found', err))
}





/// helper functions for this file below ///

function comparePassword(hash, attemptedPassword) {
  return new Promise(function(resolve, reject){
    bcrypt.compare(attemptedPassword, hash, function(err, isCorrect){
      if(err) console.log("bcrpyt error:", err);
        resolve(isCorrect);
    })
  })
}

function hashPassword (password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, null, null, function(err, hash) {
      if (err) reject(err)
      else     resolve(hash)
    });
  })
};


