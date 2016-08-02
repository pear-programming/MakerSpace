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

Reservation.findAllReservations = function() {
  return db.reservations.find({})
  .then(reservationsData => {
    return reservationsData;
  })
}

Reservation.findByName = function(name) {
  return db.rooms.find({roomName: name})
  .then(room => {
    if(room[0]){
      console.log('room[0]._id: ', room[0]._id)
      return room[0]._id
    } else {
      throw new Error('room name does not exist')
    }
  })
  .then(id => {
    return db.reservations.find({roomId: id})
  })
  .then(roomReservationData => {
    if(roomReservationData[0]) {
      return roomReservationData;
    } else {
      return 'no reservations currently exist for this room'
    }
    console.log('roomReservationData: ', roomReservationData)
  })
  .catch(err => console.log('error in findByName: ',err))
}

