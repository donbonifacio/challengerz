(function panelController() {

  var PanelController = exports;
  var Location = require('../../app/models/location.js');
  var EventTag = require('../../app/models/eventTag.js');

  exports.locations = function locations(context) {
    context.dataHandler(Location.locationsPanel);
    context.render();
  };

  exports.eventTags = function eventTags(context) {
    context.dataHandler(EventTag.tagsPanel);
    context.render();
  };

  exports.eventsFilterToBadges = function eventsFilterToBadges(context) {
    context.dataHandler(PanelController.prepareEventsFilterToBadges);
    context.render();
  };

  exports.prepareEventsFilterToBadges = function prepareEventsFilterToBadges(context, next) {
    context.eventsFilterToBadges = {};
    if(context.params.eventsFilter.eventTag) {
      context.eventsFilterToBadges.eventTags = [context.params.eventsFilter.eventTag];
    }
    var loc = context.params.eventsFilter.location;
    if(loc) {
      var event = midgard._.first(context.fetchLatest);
      context.eventsFilterToBadges.country = event.country;
      context.eventsFilterToBadges.event = event;
      if(typeof(loc) !== 'string' && loc.length >= 2 ) {
        context.eventsFilterToBadges.region = event.region;
      }
      if(loc.length === 3 ) {
        context.eventsFilterToBadges.city = event.city;
      }
    }
    next(context);
  };

})();
