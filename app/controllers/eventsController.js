(function eventsController() {

  var Event = require('../../app/models/event.js');
  exports.layout = 'layout#main';

  exports.list = function(context) {
    context.include('events#latestEvents');
    context.render();
  };

  exports.latestEvents = function latestEvents(context) {
    context.dataHandler(Event.fetchLatest);
    context.render();
  };

})();
