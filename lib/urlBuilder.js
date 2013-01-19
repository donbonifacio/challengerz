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
    return joinUrl(this.translate('events'), this.translate('eventTag'), slugifier.toSlug(this.translate(tag, tag)));
  };

  exports.eventTagLink = function eventTagLink(tag) {
    return "<a href='"+this.eventTagUrl(tag)+"' class='badge badge-success'>"+this.translate(tag, tag)+"</a>"
  };

  exports.countryUrl = function countryUrl(country) {
    return joinUrl(this.translate('events'), slugifier.toSlug(this.translate('country')), slugifier.toSlug(country));
  };

  exports.countryLink = function countryLink(country) {
    return "<a href='"+this.countryUrl(country)+"' class='badge'>"+country+"</a>";
  };

  exports.regionUrl = function regionUrl(region) {
    return joinUrl(this.translate('events'), slugifier.toSlug(this.translate('region')), slugifier.toSlug(region));
  };

  exports.regionLink = function regionLink(region) {
    return "<a href='"+this.regionUrl(region)+"' class='badge'>"+region+"</a>";
  };

  exports.cityUrl = function cityUrl(city) {
    return joinUrl(this.translate('events'), slugifier.toSlug(this.translate('city')), slugifier.toSlug(city));
  };

  exports.cityLink = function cityLink(city) {
    return "<a href='"+this.cityUrl(city)+"' class='badge'>"+city+"</a>";
  };

})();
