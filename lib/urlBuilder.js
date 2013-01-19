(function urlBuilder() {

  var urlBuilder = exports;
  var slugifier = require('slugifier');

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

  exports.eventTagUrl = function eventTagUrl(tag) {
    return joinUrl(this.translate('eventTag'), slugifier.toSlug(this.translate(tag, tag)));
  };

  exports.eventTagLink = function eventTagLink(tag) {
    return "<a href='"+this.eventTagUrl(tag)+"' class='badge'>"+this.translate(tag, tag)+"</a>"
  };

  exports.countryUrl = function countryUrl(country) {
    return joinUrl(this.translate('events'), this.translate('country'), country);
  };

})();
