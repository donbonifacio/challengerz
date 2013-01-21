(function panelController() {

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

})();
