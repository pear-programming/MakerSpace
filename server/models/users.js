var db = require('../db')
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');


var User = module.exports

User.create = function(name, email, password) {
  //check if user already exists
  return db.users.find({email:email})
    .then((user) => {
      if(user[0]){
        return "user already exists"
      } else {
        return db.users.insert(
          { name:name, 
            email:email, 
            password:password}
          )
          .then((info) => {
            //returns user object with 
            return {name:name, email: email, _id:_id}
          })
          .catch((err) => console.log('err in create: ', err))
      }
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


/* when user signs up: 
  refer to beer app repo
  -check username (done)
  -hash password (bcrypt)
  -insert user in db (done)
  -create session id (uuid) ... require in file
  -insert into user sessions table (userId and sessionId)
  -send sessionId back to client (res.cookie({sessionId: 1jsdfniuiajdsfdfs}))
  -send back user info in a response body
*/