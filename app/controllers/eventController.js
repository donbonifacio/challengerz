(function eventController() {

  exports.layout = "layout#main";

  exports.setup = function setup(context, next) {
    context.params.eventSourceSlug = context.request.regexParams[1];
    context.params.eventEdition = context.request.regexParams[2];
    context.params.eventSlug = context.request.regexParams[3];
    next(context);
  };

  exports.show = function show(context) {
    context.render();
  };

})();
