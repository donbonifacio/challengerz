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
    midgard.route('/api/create-event', 'api#createEvent');
    midgard.route('/api/list-event-tags', 'api#listEventTags');

    localizedRoute(midgard, 'url.events.list', 'events#list');

    midgard.routes.context = { staticRoot: midgard.isDevelopment ? '/' : 'http://donbonifacio.github.com/challengerz/' };
    midgard.routes.static([
      "/css/.+",
      "/img/.+",
      "/js/.+"
    ]);

    midgard.route('^/$', 'home#index');
  };

})();
