var db = require('../db.js');

var Room = module.exports

Room.addRooms = function(rooms) {

  // console.log("got room info after organization insert:", rooms, organizationId);
  var roomsWithAvailability= rooms.map((room) => Object.assign(room, {isAvailable: true})); 
  console.log("after mapping:", roomsWithAvailability);
  return db.rooms.insert(roomsWithAvailability)
  .then(data => {
    return data.map((room) => room._id);
  })
  .catch(err => console.log("error inserting rooms:", err))
}


Room.deleteRoom = function(room) {
  return db.rooms.remove( { roomName: room } )
}


Room.findRooms = function() {
  return db.rooms.find({})
}


Room.changeAvailability = function(roomName) {
  return db.rooms.find({roomName: roomName})
  .then(rooms => {
    if(rooms[0].isAvailable === true) {
      var updatedObj = rooms[0]
      updatedObj.isAvailable = false
      db.rooms.update({roomName: roomName}, updatedObj)
      return 'availability updated to false'
    } else {
      var updatedObj = rooms[0]
      updatedObj.isAvailable = true
      db.rooms.update({roomName: roomName}, updatedObj)
      return 'availability updated to true'
    }
  })
}

Room.updateRoom = function(roomId, newInfo) {
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


Room.getReservations = function() {
  //returns current availability of all rooms
}

