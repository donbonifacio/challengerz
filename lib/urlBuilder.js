(function urlBuilder() {


  var joinUrl = function joinUrl() {
    var url = '/';
    midgard._.each(arguments, function(arg) {
      url += arg + '/';
    });
    return url;
  };

  exports.eventUrl = function eventUrl(event) {
    return joinUrl(this.translate('event'), event.eventSource.slug, event.edition, event.slug);
  };

})();
