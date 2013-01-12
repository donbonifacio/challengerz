(function User() {

  var _ = require('underscore');

  exports.findOrCreate = function findOrCreate(collection, params, callback) {
    collection.findOne({username: params.username }, function(err, user) {
      if(user) {
        _.extend(user, params);
      } else {
        user = params;
      }
      collection.save(user, function(err, result) {
        callback(err, user);
      });
    });

  };

  exports.findByApiKey = function findByApiKey(collection, apiKey, callback) {
    collection.findOne({$and: [{apiKey: apiKey},{ apiKey: {$exists:true}} ]}, function(err, user) {
      callback(err, user);
    });
  };

})();	
