var db = require('../db.js');

var Reservation = module.exports

Reservation.findByRoomId = function(Id) {

  console.log("inside reservations findbyid:", id);
  return db.reservations.find({id: id})
    .then((organizations) => {
    return organizations
    })
}

Reservation.create = function(organizationData, userId) {


  var newOrganization = Object.assign(organizationData, {users: []}, {adminIds:[userId]})
  console.log("inside organization.create:", newOrganization);

  return db.organizations.insert(newOrganization)
    .then((data) => {
      console.log("successfully inserted organization!:", data)
      return data;
    })
}
