(function User() {

  var _ = require('underscore');
  var User = exports;

  User.validate = function(obj, callback) {
    if(obj._id) {
      obj.updatedAt = Date.now();
    } else {
      obj.createdAt = Date.now();
    }
    if( !obj.apiKey ) {
      obj.apiKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    }
    callback(true, null);
  };

  User.findOrCreate = function findOrCreate(collection, params, callback) {
    collection.findOne({username: params.username }, function(err, user) {
      if(user) {
        _.extend(user, params);
      } else {
        user = params;
      }
      User.validate(user, function(valid, errors) {
        if(valid) {
          collection.save(user, function(err, result) {
            callback(err, user);
          });
        } else {
          callback(errors, params);
        }
      });
    });

  };

  User.findByApiKey = function findByApiKey(collection, apiKey, callback) {
    collection.findOne({$and: [{apiKey: apiKey},{ apiKey: {$exists:true}} ]}, function(err, user) {
      callback(err, user);
    });
  };

})();	
