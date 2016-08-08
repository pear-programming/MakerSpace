var db = require('../db.js');

var Reservation = module.exports
//reservations

Reservation.findByRoomId = function(Id) {
  console.log("inside reservations findbyid:", id);
  return db.testcollection.find({id: id}) //reservations
  .then((reservations) => {
  return reservations
  })
}


Reservation.create = function(reservationData) {
  return db.testcollection.insert(reservationData)//reservations
  .then((data) => {
    console.log("successfully inserted reservation!:", data._id)
    return data._id;
  })
}

Reservation.delete = function(reservationId){
  console.log(reservationId, " reservationId")
  if( Object.keys(reservationId).length === 0 ){
    return null;
  }
  else if (typeof reservationId._id === "string"){
    reservationId._id = db.ObjectId(reservationId._id)
      return db.testcollection.remove(reservationId)//reservations
      .then((data) => {
        console.log("successfully canceled reservation!:", data)
        return data;
    }) .catch(err => console.log('error in reservation: ', err))
}
  else{
  return db.testcollection.remove(reservationId)//reservations
    .then((data) => {
      console.log("successfully canceled reservation!:", data)
      return data;
  }) .catch(err => console.log('error in reservation: ', err))
}
}



Reservation.findAllReservations = function() {
  return db.reservations.find({})//reservations
  .then(reservationsData => {

    var roomReservations = reservationsData.reduce((accum, reservation) => {
      var roomIds = accum.map((el) => el.roomId.toString())

      var index = roomIds.indexOf(reservation.roomId.toString())
      if(index !== -1) {
        accum[index].reservations.push(reservation)
        accum[index].reservations = accum[index].reservations.sort((a,b) => a.startTime - b.startTime);
        return accum;
      }
      else {
        return accum.concat({roomName: reservation.roomName, roomId: reservation.roomId, reservations: [reservation]})
      }
    }, []).sort((a, b) => a.roomName.toLowerCase().charCodeAt(0) - b.roomName.toLowerCase().charCodeAt(0))

    return roomReservations;
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


Reservation.updateReservation = function(resId, newInfo) {
  if(typeof resId==='string'){
    resId = db.ObjectId(resId)
  }

  return db.reservations.update(
    {"_id" : resId },
    { "$set" : newInfo }
  )
  .then(updatedRes => {
    // console.log('updatedRes:', updatedRes)
    return db.reservations.find({"_id":resId})
  })
  .catch(err => console.log('err in updateExisting: ', err))
}
