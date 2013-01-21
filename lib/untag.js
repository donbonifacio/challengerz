(function untag() {

  var slugifier = require('slugifier');

  exports.untag = function untag(lang) {
    var tokens = midgard.language.getTokens(lang);
    midgard._.each(Object.keys(tokens), function(token) {
      if(token.match(/^tag/)) {
        var untag = 'filter.' + slugifier.toSlug(tokens[token]);
        tokens[untag] = token.replace("tag.", "");
      }
    });
    console.log(tokens);
  };

})();
