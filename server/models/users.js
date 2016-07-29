var db = require('../db')
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');


var User = module.exports


//creates a new user and inserts into db

User.create = function(incomingAttrs) {
  var attrs = Object.assign({}, incomingAttrs);
  //check if user already exists
  //if exists throw error, if not hash password
  return db.users.find({email: attrs.email})
  .then(user => {
    if(user[0]){
      throw new Error('account already exists');
    } else {
      return hashPassword(attrs.password)
    }
  })
  .then(passwordHash => {
    attrs.password = passwordHash;
    console.log('attrs in create user', attrs)
    return db.users.insert(attrs)
  })
  .then(resp => {
    console.log('userobj with _id and password ', resp)
    return resp._id
  })
  .catch(err => console.log('err in create: ', err))
}

//gets userId from user's email
// User.findByEmail = function(email) {
//   return db.users.find({email: email})
// }


//existing user logs in
User.login = function(loginInfo) {
  console.log('loginInfo', loginInfo);
  return db.users.find({email: loginInfo.email})
  .then(user => {
   // console.log('user[0]._id: ', user[0]._id)
    return user[0]._id
  })
  .catch(err => console.log('user not found', err))
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
  -hash password (bcrypt) (done)
  -insert user in db (done)

  -create session id (uuid)
  -insert into user sessions table (userId and sessionId)
  -send sessionId back to client via cookie 
  (res.cookie({sessionId: 1jsdfniuiajdsfdfs}))
  -send back user info in a response body
*/