var database = require('../lib/database.js');
var midgard = require('midgard.js');
var User = require('../app/models/user.js');

var afterCreate = function afterCreate(err, obj) {
  midgard.logger.object(obj);
};

database.openCollection('users', function(err, collection) {
  midgard.logger.log("Creating users...");
  User.findOrCreate(collection, {username: 'donbonifacio', email: 'donbonifacio@gmail.com'}, afterCreate);
});
