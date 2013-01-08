(function routes() {

  exports.load = function load(midgard) {
    midgard.route("/events/.+", "events#list");
  };

})();	
