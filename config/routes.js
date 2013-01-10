(function routes() {

  exports.load = function load(midgard) {

    midgard.route("/events/.+", "events#list");

    midgard.routes.static([
      "/css/.+",
      "/img/.+",
      "/js/.+"
    ]);
  };

})();	
