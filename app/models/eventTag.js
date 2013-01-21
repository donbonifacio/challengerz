(function EventTag() {

  var EventTag = exports;
  var database = require('../../lib/database.js');
  var collectionName = 'eventTags';
  var slugifier = require('slugifier');
  var _ = midgard._;

  EventTag.all = function all(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      collection.find().toArray(function(err, tags) {
        context.apiResult = {success: true, eventTags: _.pluck(tags, 'slug')};
        next(context);
      });
    });

  };

  EventTag.saveAll = function saveAll(tags) {
    if(!tags || tags.length == 0 ) {
      return 0;
    }
    database.openCollection(collectionName, function(err, collection) {
      _.each(tags, function(tag) {
        var slug = slugifier.toSlug(tag);
        collection.findOne({slug:slug}, function(err, eventTag) {
          if(!eventTag) {
            collection.save({slug: slug, createdAt: Date.now()}, function(){});
          }
        });
      });
    });
  };

  EventTag.tagsPanel = function tagsPanel(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      collection.find().toArray(function(err, tags) {
        context.tagsPanel = tags;
        context.tagsPanel.sort();
        next(context);
      });
    });
  };

})();
