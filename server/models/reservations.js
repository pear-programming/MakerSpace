var db = require('../db.js');
var Room = require('./rooms.js');

var Reservation = module.exports
//reservations

Reservation.findByRoomId = function(Id) {
  console.log("inside reservations findbyid:", id);
  return db.reservations.find({id: id}) //reservations
  .then((reservations) => {
  return reservations
  })
}


Reservation.create = function(reservationData) {
  return db.reservations.insert(reservationData)//reservations
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
      return db.reservations.remove(reservationId)//reservations
      .then((data) => {
        console.log("successfully canceled reservation!:", data)
        return data;
    }) .catch(err => console.log('error in reservation: ', err))
}
  else{
  return db.reservations.remove(reservationId)//reservations
    .then((data) => {
      console.log("successfully canceled reservation!:", data)
      return data;
  }) .catch(err => console.log('error in reservation: ', err))
}
}



Reservation.findAllReservations = function() {
  return db.reservations.find({})//reservations
  .then(reservationsData => {

    // var roomReservations = reservationsData.reduce((accum, reservation) => {
    //   var roomIds = accum.map((el) => el.roomId.toString())
    //
    //   var index = roomIds.indexOf(reservation.roomId.toString())
    //   if(index !== -1) {
    //     accum[index].reservations.push(reservation)
    //     accum[index].reservations = accum[index].reservations.sort((a,b) => a.startTime - b.startTime);
    //     return accum;
    //   }
    //   else {
    //     return accum.concat({roomName: reservation.roomName, roomId: reservation.roomId, reservations: [reservation]})
    //   }
    // }, []).sort((a, b) => a.roomName.toLowerCase().charCodeAt(0) - b.roomName.toLowerCase().charCodeAt(0))
    //
    // return roomReservations;

    // makeSlots(reservationsData);
  //   db.users.find({})
  //   .then((rows) => {

  //     var userIds = rows.map((row) => row._id)
  //     var userNmes = rows.map((row) => row.name)
  //     console.log("got to users:", userNmes);

  //     db.rooms.find({})
  //       .then((data) => {

  //         roomIds = data.map((dat) => dat._id)
  //         roomNms = data.map((dat) => dat.roomName)
  //         var usIds = userIds.slice(userIds.length - 10);
  //         var usNms = userNmes.slice(userNmes.length - 10);
  //         // console.log("userIds:", usIds)
  //         console.log("roomnames", roomNms)

  //         // var usIds = userIds.slice(userIds.length - 10);
  //         var reservations = [
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 5, 11, 0), endTime: new Date(2016, 7, 5, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 6, 15, 0), endTime: new Date(2016, 7, 6, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 3, 9, 0), endTime: new Date(2016, 7, 3, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 5, 14, 0), endTime: new Date(2016, 7, 5, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 2, 16, 0), endTime: new Date(2016, 7, 2, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 5, 11, 0), endTime: new Date(2016, 7, 5, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 6, 15, 0), endTime: new Date(2016, 7, 6, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 3, 9, 0), endTime: new Date(2016, 7, 3, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 5, 14, 0), endTime: new Date(2016, 7, 5, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 2, 16, 0), endTime: new Date(2016, 7, 2, 17, 0)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 12, 11, 0), endTime: new Date(2016, 7, 12, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 18, 15, 0), endTime: new Date(2016, 7, 18, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 10, 9, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 14, 0), endTime: new Date(2016, 7, 12, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 9, 16, 0), endTime: new Date(2016, 7, 9, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 12, 11, 0), endTime: new Date(2016, 7, 12, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 18, 15, 0), endTime: new Date(2016, 7, 18, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 10, 9, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 14, 0), endTime: new Date(2016, 7, 12, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 9, 16, 0), endTime: new Date(2016, 7, 9, 17, 0)}
  //         ]

  //         console.log("showing reservations:", reservations);


  //         db.reservations.insert(reservations)
  //           .then(() =>  {
  //             console.log("success");
  //             return reservationsData;
  //           })
  //           .catch((err) => console.log("error inserting:", err))
  //       })
  // })

    // console.log("after reservations.find")

    // return reservationsData;

    // var roomReservations = reservationsData.reduce((accum, reservation) => {
    //   var roomIds = accum.map((el) => el.roomId.toString())

    //   var index = roomIds.indexOf(reservation.roomId.toString())
    //   if(index !== -1) {
    //     accum[index].reservations.push(reservation)
    //     accum[index].reservations = accum[index].reservations.sort((a,b) => a.startTime - b.startTime);
    //     return accum;
    //   }
    //   else {
    //     return accum.concat({roomName: reservation.roomName, roomId: reservation.roomId, reservations: [reservation]})
    //   }
    // }, []).sort((a, b) => a.roomName.toLowerCase().charCodeAt(0) - b.roomName.toLowerCase().charCodeAt(0))

    // return roomReservations;

    // Reservation.makeSlots
    // .then((timeSlots) => {
    //   return timeSlots
    // })
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

Reservation.makeSlots = function(reservationData) {

  var timeSlots = [];
  var start = new Date(2016, 6, 31, 19, 0)
  var end = new Date(2016, 7, 31, 19, 0)

  var thirtyMin = 1800000
  var startTime = Object.assign(start);
  var endTime = new Date(startTime.getTime() + thirtyMin);

  while(startTime.getTime() < end.getTime()) {

    timeSlots.push({startTime: startTime, endTime: endTime, reservations: [], isAvailable: true})
    startTime = Object.assign(endTime);
    endTime = new Date(endTime.getTime() + thirtyMin)
  }

  return Room.findRooms()
    .then((rooms) => {

      console.log("showing number of rooms:", rooms.length);

    reservationData.forEach((reservation) => {

      timeSlots.forEach((timeSlot) => {

        if(reservation.startTime.getTime() == timeSlot.startTime.getTime() ||
          (reservation.startTime.getTime() < timeSlot.startTime.getTime() &&
            reservation.endTime.getTime() >= timeSlot.endTime.getTime())) {
          timeSlot.reservations.push(reservation)
        }
        if(timeSlot.reservations.length >= 2) {
          timeSlot.isAvailable = false;
        }
      })
    })

    return timeSlots;

  })
}
