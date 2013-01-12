(function apiController() {

  var apiController = exports;

  apiController.setup = function setup(context, next) {
    context.httpHeaders['Content-Type'] = 'application/json';
    context.apiResult = { success: '?' };
    next(context);
  };

  apiController.createEventSource = function createEventSource(context) {
    context.render('result');
  };

})();
