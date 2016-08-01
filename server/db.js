
var pmongo = require('promised-mongo');

var uri = 'mongodb://pear:pear@ds021895.mlab.com:21895/pear';

var db = pmongo(uri, {
  authMechanism: 'ScramSHA1'
});

module.exports = db
