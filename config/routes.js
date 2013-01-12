(function routes() {

  var _ = require('underscore');

  var localizedRoute = function(midgard, token, endpoint) {
    _.each(midgard.language.supportedLanguages, function prepareLanguage(lang) {
      midgard.route(
        midgard.language.translate(lang, token), 
        endpoint,
        {requestLanguage: lang}
      );
    });
  };

  exports.load = function load(midgard) {

    midgard.route('/api/create-event-source', 'api#createEventSource');

    localizedRoute(midgard, 'url.events.list', 'events#list');

    midgard.routes.static([
      "/css/.+",
      "/img/.+",
      "/js/.+"
    ]);
  };

})();	
