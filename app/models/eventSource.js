(function EventSource() {

  var database = require('../../lib/database.js');

  var EventSource = exports;
  var collectionName = 'eventSources';

  EventSource.validate = function validate(obj, callback) {
    var errors = [];
    midgard.validator.string(errors, obj, 'slug');
    midgard.validator.string(errors, obj, 'owner');
    midgard.validator.string(errors, obj, 'name');
    midgard.validator.string(errors, obj, 'website');
    midgard.validator.boolean(errors, obj, 'visible');
    if(obj._id) {
      obj.updatedAt = Date.now();
    } else {
      obj.createdAt = Date.now();
    }
    callback(errors.length == 0, errors);
  };

  EventSource.findBySlug = function findBySlug(slug, callback) {
    database.openCollection(collectionName, function(err, collection) {
      collection.findOne({slug: slug}, callback);
    });
  };

  EventSource.createFromContext = function createFromContext(context, next) {
    context.apiResult = {};
    var model = context.requestModel;
    model.owner = context.currentUser.username;
    EventSource.validate(model, function(valid, errors) {
      if(valid) {
        context.apiResult.success = true;
        database.openCollection(collectionName, function(err, collection) {
          collection.save(model, function(err, result) {
            context.apiResult.eventSource = model;
            next(context);
          });
        });
      } else {
        context.apiResult.success = false;
        context.apiResult.errors = errors;
        next(context);
      }
    });
  };

})();
