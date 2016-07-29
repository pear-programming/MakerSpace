var db = require('../db.js'); 

var Organization = module.exports 

Organization.findByName = function(name) {

	console.log("inside organ findbyname:", name);
	return db.organizations.find({name: name})
		.then((organizations) => {
			return organizations

		})

}

Organization.create = function(organizationData, userId) {
	

	var newOrganization = Object.assign(organizationData, {users: []}, {adminIds:[userId]})
	console.log("inside organization.create:", newOrganization);

	return db.organizations.insert(newOrganization)
		.then((data) => {

			console.log("successfully inserted organization!:", data)
			return data;
		})
}


Organization.findAll = function() {
  return db.organizations.find({});
}

Organization.findByOrgName = function(name) {
  return db.organizations.find({name : name})
  .then(rows => {
    return rows[0]
  })
}
