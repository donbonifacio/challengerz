(function eventsController() {

  var Event = require('../../app/models/event.js');
  exports.layout = 'layout#main';

  var resolveRequestFilter = function resolveRequestFilter(context) {
    var filter = {};
    var url = context.request.url;
    var parts = midgard._.compact(url.split('/'));
    parts.shift();
    while(parts.length > 0 ) {
      var key = context.translate('filter.'+parts.shift());
      var search = parts.shift();
      var value = context.translate('filter.'+search, search);
      filter[key] = value;
    }
    return filter;
  };

  exports.list = function(context) {
    context.params.eventsFilter = resolveRequestFilter(context);
    context.include('events#latestEvents');
    context.render();
  };

  exports.latestEvents = function latestEvents(context) {
    context.dataHandler(Event.fetchLatest);
    context.render();
  };

})();
