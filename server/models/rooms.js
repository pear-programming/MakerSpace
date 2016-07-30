var db = require('../db.js');

var Room = module.exports

Room.addRooms = function(rooms) {

	// console.log("got room info after organization insert:", rooms, organizationId);
	var roomsWithAvailability= rooms.map((room) => Object.assign(room, {isAvailable: true}));
	console.log("after mapping:", roomsWithAvailability);
	return db.rooms.insert(roomsWithAvailability)
		.then((data) => {
			console.log("after rooms insertion!", data);
			return data.map((room) => room._id);
		})
		.catch((err) => console.log("error inserting rooms:", err))
}


Room.findRooms = function(){
	return db.rooms.find({})
	.catch((err) => console.log("error no rooms:", err))
}

Room.roomStatus = function(roomInfo) {
	// var attrs = Object.assign({}, incomingAttrs);
	return db.rooms.find({name: roomInfo.name})
	.then(room => {
		console.log(room)
	})
}
