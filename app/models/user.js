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

})();	
