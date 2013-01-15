(function EventSource() {

  var database = require('../../lib/database.js');

  var EventSource = exports;

  EventSource.validate = function validate(obj, callback) {
    errors = [];
    if( !(midgard.validator.present(obj.slug) && midgard.validator.string(obj.slug)) ) {
      errors.push({field: 'slug', error:'Must be present' });
    }
    if(obj._id) {
      obj.updatedAt = Date.now();
    } else {
      obj.createdAt = Date.now();
    }
    callback(errors.length == 0, errors);
  };

  EventSource.createFromContext = function createFromContext(context, next) {
    context.apiResult = {};
    var model = JSON.parse(context.request.body);
    EventSource.validate(model, function(valid, errors) {
      if(valid) {
        context.apiResult.success = true;
        database.openCollection('eventSources', function(err, collection) {
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
