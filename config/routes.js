(function routes() {

  exports.load = function load(midgard) {

    var _ = require('underscore');

    _.each(midgard.language.supportedLanguages, function prepareLanguage(lang) {
      midgard.route(
        midgard.language.translate(lang, "url.events.list"), 
        "events#list", 
        {requestLanguage: lang}
      );
    });

    midgard.routes.static([
      "/css/.+",
      "/img/.+",
      "/js/.+"
    ]);
  };

})();	
