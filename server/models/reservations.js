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

// Reservation.changeReservation = function(reservationInfo) {
//   console.log("in changeReservation function ", reservationInfo)
//   return db.reservations.update(
//     {_id: reservationInfo._id},
//     {$set: {startTime: reservationInfo.startTime} },
//     {multi: false}
//     )
//   .then(reservation => {
//     console.log("successfully changed your reservation!:", reservation)
//     return reservation
//   })
// }

Reservation.delete = function(reservationId){
  console.log(reservationId._id, " reservationId")
  return db.reservations.remove(_id:reservationId._id)
    .then((data) => {
      console.log("successfully canceled reservation!:", data)
      return data;
  })
}










