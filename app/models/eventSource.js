(function EventSource() {

  var EventSource = exports;

  EventSource.validate = function validate(obj, calback) {
    if(obj._id) {
      obj.updatedAt = Date.now();
    } else {
      obj.createdAt = Date.now();
    }
  };

  EventSource.createFromContext = function createFromContext(context, next) {
    next(context);
    return;
    context.apiResult = {};
    var model = JSON.parse(context.response._actual.request.body);
    console.log(model);
    EventSource.validate(model, function(valid, errors) {
      if(valid) {
        context.apiResult.success = true;
        database.openCollection('eventSources', function(err, callback) {
          collection.save(model, function(err, calback) {
            context.apiResult.eventSource = model;
          });
        });
      } else {
        context.apiResult.success = false;
        context.apiResult.errors = errors;
      }
      next(context);
    });
  };

})();
