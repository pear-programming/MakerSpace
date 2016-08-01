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

  var start = Date.UTC(2016, 7, 1, 16, 0, 0)
  var end = Date.UTC(2016, 7, 1, 16, 30, 0)
  reservationData.startTime = start;
  reservationData.endTime = end;

  return db.reservations.insert(reservationData)
    .then((data) => {
      console.log("successfully inserted reservation!:", data)
      return data;
    })
}
