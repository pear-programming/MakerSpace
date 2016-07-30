var db = require('../db.js'); 

var Organization = module.exports 


Organization.findAll = function() {
  return db.organizations.find({});
}


Organization.findByName = function(name) {
  console.log("inside org findByName:", name);
  return db.organizations.find({name: name})
  .then((organizations) => {
    return organizations
  })
}


Organization.create = function(organizationData, userId) {
  var newOrganization = Object.assign(organizationData, {users: []}, {adminIds:[userId]})
  console.log("inside organization.create:", newOrganization);
  
  return db.organizations.insert(newOrganization)
  .then((data) => {
    console.log("successfully inserted organization!:", data)
    return data;
  })
}



