var db = require('../db.js');

var Room = module.exports 

Room.addRooms = function(rooms, organizationId) {

	// console.log("got room info after organization insert:", rooms, organizationId);
	var roomsWithOrgId = rooms.map((room) => Object.assign(room, {organizationId: organizationId})); 
	console.log("after mapping:", roomsWithOrgId);
	return db.rooms.insert(roomsWithOrgId)
		.then(() => {
			console.log("after rooms insertion!");
			return "done";
		})
		.catch((err) => console.log("error inserting rooms:", err))
}


