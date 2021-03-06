(function() {

  exports.layout = "layout#main";

  exports.index = function(context) {
    var targetLang = midgard.language.getSupportedLanguage(context.requestLanguage);
    context.redirectTo('/' + targetLang + '/');
  };

  exports.languageIndex = function languageIndex(context) {
    context.include('panel#locations');
    context.include('panel#eventTags');
    context.render();
  };

})();
