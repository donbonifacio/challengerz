(function apiController() {

  var database = require('../../lib/database.js');
  var User = require('../../app/models/user.js');
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

  apiController.createEventSource = function createEventSource(context) {
    context.render('result');
  };

})();
