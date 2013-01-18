(function eventController() {

  var Event = require('../../app/models/event.js');
  exports.layout = "layout#main";

  exports.show = function show(context) {
    context.params.eventSourceSlug = context.request.regexParams[1];
    context.params.eventEdition = parseInt(context.request.regexParams[2]);
    context.params.eventSlug = context.request.regexParams[3];
    context.dataHandler(Event.loadShowPageInfo);
    context.render();
  };

})();
