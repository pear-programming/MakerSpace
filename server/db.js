
var pmongo = require('promised-mongo');

var uri = 'mongodb://pear:pear@ds021895.mlab.com:21895/pear';

var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});


// db.deleteEverything = function () {
//   return Promise.all([
//     db.collection('users').remove({})
//     db.collection('admins').remove({})
//     db.collection('organizations').remove({})
//     db.collection('rooms').remove({})
//     db.collection('userSessions').remove({})
//     db.collection('adminSessions').remove({})
//   ])
// };

module.exports = db