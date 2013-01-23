(function eventsController() {

  var EventsController = exports;
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
      if(value.match(/\+/)) {
        value = value.split('+');
      }
      filter[key] = value;
    }
    return filter;
  };

  exports.setPageTitle = function setPageTitle(context, next) {
    var title = context.translate('eventsTitle');
    if(context.params.eventsFilter.eventTag) {
      title += " » " + context.translate('tag.'+context.params.eventsFilter.eventTag);
    }
    var loc = context.params.eventsFilter.location;
    if(loc) {
      var event = midgard._.first(context.fetchLatest);
      if(loc.length === 1 || loc ) {
        title += ' » ' + event.country;
      } 
      if(loc.length == 2 ) {
        title += ' » ' + event.region;
      }
      if(loc.length == 3 ) {
        title += ' » ' + event.city;
      }
    }
    context.pageTitle = title;
    next(context);
  };

  exports.list = function(context) {
    context.params.eventsFilter = resolveRequestFilter(context);
    context.include('events#latestEvents');
    context.render();
  };

  exports.latestEvents = function latestEvents(context) {
    context.dataHandler(Event.fetchLatest);
    context.dataHandler(EventsController.setPageTitle);
    context.render();
  };

})();
