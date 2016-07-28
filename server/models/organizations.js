var db = require('../db.js'); 

var Organization = module.exports 

Organization.findByName = function(name) {

	console.log("inside organ findbyname:", name);
	return db.organizations.find({name: name})
		.then((organizations) => {
			return organizations

		})

}

Organization.create = function(organizationData) {
	

	var newOrganization = Object.assign(organizationData, {users: []}, {adminIds:[]})

	return db.organizations.insert(newOrganization)
		.then((data) => {

			console.log("successfully inserted organization!:", data)
			return data;
		})
}