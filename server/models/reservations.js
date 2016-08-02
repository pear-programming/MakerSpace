var db = require('../db.js');

var Reservation = module.exports

Reservation.findByRoomId = function(Id) {

  console.log("inside reservations findbyid:", id);
  return db.reservations.find({id: id})
  .then((organizations) => {
  return organizations
  })
}

Reservation.create = function(organizationData, userId) {


  var newOrganization = Object.assign(organizationData, {users: []}, {adminIds:[userId]})
  console.log("inside organization.create:", newOrganization);

  return db.organizations.insert(newOrganization)
  .then((data) => {
    console.log("successfully inserted organization!:", data)
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
    if(roomReservationData.length > 0) {
      return roomReservationData;
    } else {
      return 'no reservations currently exist for this room'
    }
    console.log('roomReservationData: ', roomReservationData)
  })
  .catch(err => console.log('error in findByName: ',err))
}




/* reservationsData:
{
    "_id": {
        "$oid": "579fae963d1adf8a1555e625"
    },
    "roomId": "579ba6a08b6fcb4204613360",
    "userId": "579a61aa9a87774e3f098f51",
    "startTime": {
        "$date": "2016-08-05T16:00:00.000Z"
    },
    "endTime": {
        "$date": "2016-08-05T16:30:00.000Z"
    }
}
*/