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
    ////////////////////////////////////////
  //   db.users.find({})
  //   .then((rows) => {
  //
  //     var userIds = rows.map((row) => row._id)
  //     var userNmes = rows.map((row) => row.name)
  //     console.log("got to users:", userNmes);
  //
  //     db.rooms.find({})
  //       .then((data) => {
  //
  //         roomIds = data.map((dat) => dat._id)
  //         roomNms = data.map((dat) => dat.roomName)
  //         var usIds = userIds
  //         var usNms = userNmes
  //         // console.log("userIds:", usIds)
  //         console.log("roomnames", roomNms)
  //
  //         // var usIds = userIds.slice(userIds.length - 10);
  //         var reservations = [
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 5, 11, 0), endTime: new Date(2016, 8, 5, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 6, 15, 0), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 8, 3, 9, 0), endTime: new Date(2016, 8, 3, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 5, 14, 0), endTime: new Date(2016, 8, 5, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 2, 16, 0), endTime: new Date(2016, 8, 2, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 8, 5, 11, 0), endTime: new Date(2016, 8, 5, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 8, 6, 15, 0), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 3, 9, 0), endTime: new Date(2016, 8, 3, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 5, 14, 0), endTime: new Date(2016, 8, 5, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 2, 16, 0), endTime: new Date(2016, 8, 2, 17, 0)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 12, 11, 0), endTime: new Date(2016, 8, 12, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 18, 15, 0), endTime: new Date(2016, 8, 18, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 8, 10, 9, 0), endTime: new Date(2016, 8, 10, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 12, 14, 0), endTime: new Date(2016, 8, 12, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 9, 16, 0), endTime: new Date(2016, 8, 9, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 8, 12, 11, 0), endTime: new Date(2016, 8, 12, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 8, 18, 15, 0), endTime: new Date(2016, 8, 18, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 10, 9, 0), endTime: new Date(2016, 8, 10, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 12, 14, 0), endTime: new Date(2016, 8, 12, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 9, 16, 0), endTime: new Date(2016, 8, 9, 17, 0)},
  //
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[11], userName: usNms[11], startTime: new Date(2016, 8, 5, 11, 30), endTime: new Date(2016, 8, 5, 12, 0)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[12], userName: usNms[12], startTime: new Date(2016, 8, 6, 15, 30), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[13], userName: usNms[13], startTime: new Date(2016, 8, 3, 9, 30), endTime: new Date(2016, 8, 3, 10, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[14], userName: usNms[14], startTime: new Date(2016, 8, 5, 14, 30), endTime: new Date(2016, 8, 5, 16, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[15], userName: usNms[15], startTime: new Date(2016, 8, 2, 17, 0), endTime: new Date(2016, 8, 2, 18, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[16], userName: usNms[16], startTime: new Date(2016, 8, 5, 12, 30), endTime: new Date(2016, 8, 5, 13, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[17], userName: usNms[17], startTime: new Date(2016, 8, 6, 16, 0), endTime: new Date(2016, 8, 6, 16, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[18], userName: usNms[18], startTime: new Date(2016, 8, 3, 10, 0), endTime: new Date(2016, 8, 3, 10, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[19], userName: usNms[19], startTime: new Date(2016, 8, 5, 15, 30), endTime: new Date(2016, 8, 5, 16, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[20], userName: usNms[20], startTime: new Date(2016, 8, 2, 17, 0), endTime: new Date(2016, 8, 2, 18, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[21],  userName: usNms[21], startTime: new Date(2016, 8, 12, 11, 30), endTime: new Date(2016, 8, 12, 12, 30)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[22], userName: usNms[22], startTime: new Date(2016, 8, 18, 16, 0), endTime: new Date(2016, 8, 18, 17, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[23],  userName: usNms[23], startTime: new Date(2016, 8, 10, 10, 0), endTime: new Date(2016, 8, 10, 10, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[0],   userName: usNms[0], startTime: new Date(2016, 8, 12, 15, 30), endTime: new Date(2016, 8, 12, 16, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3],  userName: usNms[3], startTime: new Date(2016, 8, 9, 17, 0), endTime: new Date(2016, 8, 9, 18, 0)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[4],  userName: usNms[4], startTime: new Date(2016, 8, 12, 12, 30), endTime: new Date(2016, 8, 12, 13, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[5],  userName: usNms[5], startTime: new Date(2016, 8, 18, 16, 0), endTime: new Date(2016, 8, 18, 17, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[6],  userName: usNms[6], startTime: new Date(2016, 8, 10, 10, 0), endTime: new Date(2016, 8, 10, 10, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[7],  userName: usNms[7], startTime: new Date(2016, 8, 12, 15, 30), endTime: new Date(2016, 8, 12, 16, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[8],  userName: usNms[8], startTime: new Date(2016, 8, 9, 17, 0), endTime: new Date(2016, 8, 9, 18, 0)},
  //
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 8, 11, 0), endTime: new Date(2016, 7, 8, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 9, 15, 0), endTime: new Date(2016, 7, 9, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 9, 9, 0),  endTime: new Date(2016, 7, 9, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 8, 14, 0), endTime: new Date(2016, 7, 8, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 8, 16, 0), endTime: new Date(2016, 7, 8, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 8, 11, 0), endTime: new Date(2016, 7, 8, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 8, 15, 0), endTime: new Date(2016, 7, 8, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 9, 9, 0),  endTime: new Date(2016, 7, 9, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 9, 14, 0), endTime: new Date(2016, 7, 9, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 8, 16, 0), endTime: new Date(2016, 7, 8, 17, 0)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 12, 11, 0), endTime: new Date(2016, 7, 12, 11, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 18, 15, 0), endTime: new Date(2016, 7, 18, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 10, 9, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 14, 0), endTime: new Date(2016, 7, 12, 15, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 9, 16, 0), endTime: new Date(2016, 7, 9, 17, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 12, 11, 0), endTime: new Date(2016, 7, 12, 12, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 18, 15, 0), endTime: new Date(2016, 7, 18, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 10, 9, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 14, 0), endTime: new Date(2016, 7, 12, 15, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 9, 16, 0), endTime: new Date(2016, 7, 9, 17, 0)},
  //
  //
  //
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 5, 11, 0), endTime: new Date(2016, 8, 5, 11, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 6, 15, 0), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 8, 3, 9, 0), endTime: new Date(2016, 8, 3, 9, 30)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 5, 14, 0), endTime: new Date(2016, 8, 5, 15, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 2, 16, 0), endTime: new Date(2016, 8, 2, 17, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 8, 5, 11, 0), endTime: new Date(2016, 8, 5, 12, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 8, 6, 15, 0), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 3, 9, 0), endTime: new Date(2016, 8, 3, 9, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 5, 14, 0), endTime: new Date(2016, 8, 5, 15, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 2, 16, 0), endTime: new Date(2016, 8, 2, 17, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 12, 11, 0), endTime: new Date(2016, 8, 12, 11, 30)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 8, 18, 15, 0), endTime: new Date(2016, 8, 18, 16, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 8, 10, 9, 0), endTime: new Date(2016, 8, 10, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 12, 14, 0), endTime: new Date(2016, 8, 12, 15, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 9, 16, 0), endTime: new Date(2016, 8, 9, 17, 0)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 8, 12, 11, 0), endTime: new Date(2016, 8, 12, 12, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 8, 18, 15, 0), endTime: new Date(2016, 8, 18, 16, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 8, 10, 9, 0), endTime: new Date(2016, 8, 10, 9, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 12, 14, 0), endTime: new Date(2016, 8, 12, 15, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 8, 9, 16, 0), endTime: new Date(2016, 8, 9, 17, 0)},
  //
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 8, 5, 11, 30), endTime: new Date(2016, 8, 5, 12, 0)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 8, 6, 15, 30), endTime: new Date(2016, 8, 6, 16, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[6], userName: usNms[6], startTime: new Date(2016, 8, 3, 9, 30), endTime: new Date(2016, 8, 3, 10, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[16], userName: usNms[16], startTime: new Date(2016, 8, 5, 14, 30), endTime: new Date(2016, 8, 5, 16, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 8, 2, 17, 0), endTime: new Date(2016, 8, 2, 18, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[10], userName: usNms[10], startTime: new Date(2016, 8, 5, 12, 30), endTime: new Date(2016, 8, 5, 13, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[13], userName: usNms[13], startTime: new Date(2016, 8, 6, 16, 0), endTime: new Date(2016, 8, 6, 16, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[15], userName: usNms[15], startTime: new Date(2016, 8, 3, 10, 0), endTime: new Date(2016, 8, 3, 10, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[12], userName: usNms[12], startTime: new Date(2016, 8, 5, 15, 30), endTime: new Date(2016, 8, 5, 16, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[23], userName: usNms[23], startTime: new Date(2016, 8, 2, 17, 0), endTime: new Date(2016, 8, 2, 18, 0)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[3],  userName: usNms[3], startTime: new Date(2016, 8, 12, 11, 30), endTime: new Date(2016, 8, 12, 12, 30)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[2], userName: usNms[2], startTime: new Date(2016, 8, 18, 16, 0), endTime: new Date(2016, 8, 18, 17, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[5],  userName: usNms[5], startTime: new Date(2016, 8, 10, 10, 0), endTime: new Date(2016, 8, 10, 10, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5],   userName: usNms[5], startTime: new Date(2016, 8, 12, 15, 30), endTime: new Date(2016, 8, 12, 16, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[7],  userName: usNms[7], startTime: new Date(2016, 8, 9, 17, 0), endTime: new Date(2016, 8, 9, 18, 0)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[9],  userName: usNms[9], startTime: new Date(2016, 8, 12, 12, 30), endTime: new Date(2016, 8, 12, 13, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[10],  userName: usNms[10], startTime: new Date(2016, 8, 18, 16, 0), endTime: new Date(2016, 8, 18, 17, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[9],  userName: usNms[9], startTime: new Date(2016, 8, 10, 10, 0), endTime: new Date(2016, 8, 10, 10, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[10],  userName: usNms[10], startTime: new Date(2016, 8, 12, 15, 30), endTime: new Date(2016, 8, 12, 16, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[10],  userName: usNms[10], startTime: new Date(2016, 8, 9, 17, 0), endTime: new Date(2016, 8, 9, 18, 0)},
  //
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 8, 9, 0), endTime: new Date(2016, 7, 8, 9, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 7, 9, 14, 0), endTime: new Date(2016, 7, 9, 15, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[2], userName: usNms[2], startTime: new Date(2016, 7, 8, 8, 0),  endTime: new Date(2016, 7, 8, 9, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 9, 13, 0), endTime: new Date(2016, 7, 9, 14, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 9, 15, 0), endTime: new Date(2016, 7, 9, 16, 0)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[6], userName: usNms[6], startTime: new Date(2016, 7, 10, 10, 0), endTime: new Date(2016, 7, 10, 11, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[9], userName: usNms[9], startTime: new Date(2016, 7, 8, 14, 0), endTime: new Date(2016, 7, 8, 15, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 9, 8, 0),  endTime: new Date(2016, 7, 9, 9, 30)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 8, 13, 0), endTime: new Date(2016, 7, 8, 14, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 8, 15, 0), endTime: new Date(2016, 7, 8, 16, 0)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 12, 10, 0), endTime: new Date(2016, 7, 12, 11, 30)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 18, 14, 0), endTime: new Date(2016, 7, 18, 15, 0)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 10, 8, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 12, 0), endTime: new Date(2016, 7, 12, 13, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[2], userName: usNms[2], startTime: new Date(2016, 7, 9, 12, 0), endTime: new Date(2016, 7, 9, 14, 0)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 7, 12, 9, 0), endTime: new Date(2016, 7, 12, 11, 30)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[9], userName: usNms[9], startTime: new Date(2016, 7, 18, 13, 0), endTime: new Date(2016, 7, 18, 14, 0)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 10, 8, 0), endTime: new Date(2016, 7, 10, 9, 30)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[6], userName: usNms[6], startTime: new Date(2016, 7, 12, 12, 0), endTime: new Date(2016, 7, 12, 13, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 9, 15, 0), endTime: new Date(2016, 7, 9, 17, 0)},
  //
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 8, 4, 0), endTime: new Date(2016, 7, 8, 4, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 7, 9, 5, 0), endTime: new Date(2016, 7, 9, 6, 0)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[2], userName: usNms[2], startTime: new Date(2016, 7, 8, 6, 0),  endTime: new Date(2016, 7, 8, 7, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 9, 4, 0), endTime: new Date(2016, 7, 9, 5, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[5], userName: usNms[5], startTime: new Date(2016, 7, 9, 5, 0), endTime: new Date(2016, 7, 9, 6, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[6], userName: usNms[6], startTime: new Date(2016, 7, 10, 6, 0), endTime: new Date(2016, 7, 10, 7, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[9], userName: usNms[9], startTime: new Date(2016, 7, 8, 4, 0), endTime: new Date(2016, 7, 8, 6, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 9, 5, 0),  endTime: new Date(2016, 7, 9, 6, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[8], userName: usNms[8], startTime: new Date(2016, 7, 8, 4, 0), endTime: new Date(2016, 7, 8, 5, 30)},
  //           {roomId: roomIds[8], roomName: roomNms[8], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 8, 5, 0), endTime: new Date(2016, 7, 8, 6, 0)},
  //           {roomId: roomIds[9], roomName: roomNms[9], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 12, 4, 0), endTime: new Date(2016, 7, 12, 4, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 18, 5, 0), endTime: new Date(2016, 7, 18, 6, 0)},
  //           {roomId: roomIds[1], roomName: roomNms[1], userId: usIds[7], userName: usNms[7], startTime: new Date(2016, 7, 10, 6, 0), endTime: new Date(2016, 7, 10, 7, 30)},
  //           {roomId: roomIds[2], roomName: roomNms[2], userId: usIds[3], userName: usNms[3], startTime: new Date(2016, 7, 12, 4, 0), endTime: new Date(2016, 7, 12, 4, 30)},
  //           {roomId: roomIds[3], roomName: roomNms[3], userId: usIds[2], userName: usNms[2], startTime: new Date(2016, 7, 9, 5, 0), endTime: new Date(2016, 7, 9, 6, 0)},
  //           {roomId: roomIds[4], roomName: roomNms[4], userId: usIds[1], userName: usNms[1], startTime: new Date(2016, 7, 12, 4, 0), endTime: new Date(2016, 7, 12, 5, 30)},
  //           {roomId: roomIds[5], roomName: roomNms[5], userId: usIds[9], userName: usNms[9], startTime: new Date(2016, 7, 18, 6, 0), endTime: new Date(2016, 7, 18, 7, 0)},
  //           {roomId: roomIds[6], roomName: roomNms[6], userId: usIds[0], userName: usNms[0], startTime: new Date(2016, 7, 10, 4, 0), endTime: new Date(2016, 7, 10, 4, 30)},
  //           {roomId: roomIds[7], roomName: roomNms[7], userId: usIds[6], userName: usNms[6], startTime: new Date(2016, 7, 12, 5, 0), endTime: new Date(2016, 7, 12, 5, 30)},
  //           {roomId: roomIds[0], roomName: roomNms[0], userId: usIds[4], userName: usNms[4], startTime: new Date(2016, 7, 9, 6, 0), endTime: new Date(2016, 7, 9, 7, 0)}
  //
  //
  //         ]
  //
  //         console.log("showing reservations:", reservations);
  //
  //
  //         db.reservations.insert(reservations)
  //           .then(() =>  {
  //             console.log("success");
  //             return reservationsData;
  //           })
  //           .catch((err) => console.log("error inserting:", err))
  //       })
  // })
///////////////////////
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
