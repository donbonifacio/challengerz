(function EventTag() {

  var EventTag = exports;
  var database = require('../../lib/database.js');
  var collectionName = 'eventTags';

  EventTag.all = function all(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      collection.find().toArray(function(err, tags) {
        context.apiResult = {success: true, eventTags: tags};
        next(context);
      });
    });

  };

})();
