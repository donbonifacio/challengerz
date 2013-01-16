(function apiController() {

  var database = require('../../lib/database.js');
  var User = require('../../app/models/user.js');
  var EventSource = require('../../app/models/eventSource.js');
  var EventTag = require('../../app/models/eventTag.js');
  var Event = require('../../app/models/event.js');
  var apiController = exports;

  apiController.setup = function setup(context, next) {
    context.httpHeaders['Content-Type'] = 'application/json';
    context.apiResult = { success: '?' };

    if( context.request.method !== 'GET' ) {
      context.requestModel = context.parseJSONBody();
      if(!context.requestModel) {
        context.apiResult.success = false;
        context.apiResult.error = 'Invalid JSON in request';
        next(context);
        return;
      }
    }

    database.openCollection('users', function(err, collection) {
      User.findByApiKey(collection, context.params.apiKey, function(err, user) {
        context.currentUser = user;
        if(!context.currentUser) {
          context.httpStatusCode = 401;
          context.apiResult = { success: false, error: "Can't find user"};
        }
        next(context);
      });
    });
  };

  var processApiRequest = function createHandler(method, handler) {
    return function processApiRequest(context) {
      if(context.request.method !== method ) {
        context.httpStatusCode = 405;
        context.httpHeaders["Allow"] = method;
        context.apiResult = {success: false, error: 'Expecting ' + method + ' request'};
      } else if(context.currentUser) {
        context.dataHandler(handler);
      }
      context.render('result');
    }
  };

  apiController.listEventTags = processApiRequest('GET', EventTag.all);
  apiController.createEventSource = processApiRequest('POST', EventSource.createFromContext);
  apiController.createEvent = processApiRequest('POST', Event.createFromContext);

})();
