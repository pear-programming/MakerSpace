var Reservation = require('./models/reservations.js');
var Room = require('./models/rooms.js');

var Check = module.exports



Check.update = function() {
  var date = new Date();
  var currentTime = date.getTime();
  var rooms;
  var resv;
  var roomsToClose = [];
  var bookedRooms = [];
  
  return Reservation.findAllReservations()
  .then(reservationsData => {
    resv = reservationsData
    return Room.findRooms()
  })
  .then(data => {
    rooms = data
  })
  .then(() => {
    resv.forEach( x => {
      var resStart = x.startTime.getTime() + 18000000;
      var resEnd = x.endTime.getTime() + 18000000;
      var currRoom = rooms.find(findRoom)

      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === x.roomName;
      }

      if(resStart <= currentTime && currentTime <= resEnd) {
        bookedRooms.push(x.roomName)
        if(currRoom.isAvailable === true) {
          roomsToClose.push(x.roomName)
        }
      } else {
      }
    })
    console.log('booked rooms: ', bookedRooms)
  })
  .then(() => {
    var openRooms = rooms.map( room => room.roomName ).filter( x => !(bookedRooms.indexOf(x) >= 0))
    var roomsToOpen = []
    console.log('openRooms', openRooms)
    
    openRooms.forEach( room => {
      var currentRoom = rooms.find(findRoom)
      function findRoom(findThisRoom) { 
        return findThisRoom.roomName === room;
      }
      if(currentRoom.isAvailable === false) {
        roomsToOpen.push(currentRoom.roomName)
      }
    })

    roomsToClose.forEach( room => {
      Room.changeAvailability(room)
      .then(() => console.log('changing status'))
    })
    roomsToOpen.forEach( room => {
      Room.changeAvailability(room)
      .then(() => console.log('changing status'))
    })
  })
}
