(function events() {

  var urlBuilder = require('./urlBuilder.js');

  midgard.events.on('context.created', function(context) {
    midgard._.extend(context, urlBuilder);

  });

})();
