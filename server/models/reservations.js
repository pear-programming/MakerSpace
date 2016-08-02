var db = require('../db.js');

var Reservation = module.exports

Reservation.findByRoomId = function(Id) {
  console.log("inside reservations findbyid:", id);
  return db.reservations.find({id: id})
    .then((reservations) => {
    return reservations
    })
}

Reservation.create = function(reservationData) {
  return db.reservations.insert(reservationData)
    .then((data) => {
      console.log("successfully inserted reservation!:", data._id)
      return data._id;
    })
}
