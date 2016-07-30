var db = require('../db.js');

var Room = module.exports

Room.addRooms = function(rooms) {

  // console.log("got room info after organization insert:", rooms, organizationId);
  var roomsWithAvailability= rooms.map((room) => Object.assign(room, {isAvailable: true})); 
  console.log("after mapping:", roomsWithAvailability);
  return db.rooms.insert(roomsWithAvailability)
  .then(data => {
    console.log("after rooms insertion!", data);
    return data.map((room) => room._id);
  })
  .catch(err => console.log("error inserting rooms:", err))
}


Room.findRooms = function() {
  return db.rooms.find({})
}


Room.changeAvailability = function(roomName) {
  console.log('room parameter: ', roomName)
  return db.rooms.find({name: roomName})
  .then(rooms => {
    console.log('rooms in changeAvailability: ', rooms)
    if(rooms[0].isAvailable === true) {
      console.log('should change to false~~~', rooms[0])
      var updatedObj = rooms[0]
      updatedObj.isAvailable = false
      console.log('updatedObj: ', updatedObj)
      db.rooms.update({name: roomName}, updatedObj)
      return 'availability updated to false'
    } else {
      console.log('should change to true')
      var updatedObj = rooms[0]
      updatedObj.isAvailable = true
      db.rooms.update({name: roomName}, updatedObj)
      return 'availability updated to true'
    }
  })
}

