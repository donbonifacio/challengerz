(function apiController() {

  var database = require('../../lib/database.js');
  var User = require('../../app/models/user.js');
  var EventSource = require('../../app/models/eventSource.js');
  var apiController = exports;

  apiController.setup = function setup(context, next) {
    context.httpHeaders['Content-Type'] = 'application/json';
    context.apiResult = { success: '?' };

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
        context.apiResult = {success: false, error: 'Expecting ' + method + ' request'};
      } else {
        if(context.currentUser) {
          context.dataHandler(handler);
        }
        context.render('result');
      }
    }
  };

  apiController.createEventSource = processApiRequest('POST', EventSource.create);

})();
