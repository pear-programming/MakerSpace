var path = require('path')
var db = require('../db')

var User = module.exports

User.create = function(name, email, password) {
  //check if user already exists
  return db.users.find({email:email})
    .then((user) => {
      if(user[0]){
        return "user already exists"
      } else {
        return db.users.insert({name:name, email:email, password:password})
          .then((info) => {
            //returns name of user
            return info.name
          })
          .catch((err) => console.log('err in create: ', err))
      }
    })
}

