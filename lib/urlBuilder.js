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
    return joinUrl(this.translate('events'), this.translate('eventTag'), slugifier.toSlug(this.translate('tag.'+tag, tag)));
  };

  exports.eventTagLink = function eventTagLink(tag) {
    return "<a href='"+this.eventTagUrl(tag)+"' class='badge badge-success'>"+this.translate('tag.'+tag, tag)+"</a>"
  };

  exports.countryUrl = function countryUrl(country) {
    return joinUrl(this.translate('events'), this.translate('filter.location'), slugifier.toSlug(country));
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

  exports.locationLink = function locationLink(loc, mode) {
    var filter = mode || 'region';
    if( mode === 'country' ) {
      var url = joinUrl(
        this.translate('events'),
        this.translate('filter.location'),
        loc.countrySlug
      );
      return "<a href='"+url+"' class='badge'>"+loc.country+"</a>";
    }
    if( mode === 'region' ) {
      var url = joinUrl(
        this.translate('events'),
        this.translate('filter.location'),
        loc.countrySlug+'+'+loc.regionSlug
      );
      return "<a href='"+url+"' class='badge'>"+loc.region+"</a>";
    }
    var url = joinUrl(
      this.translate('events'),
      this.translate('filter.location'),
      loc.countrySlug+'+'+loc.regionSlug+'+'+loc.citySlug
    );
    return "<a href='"+url+"' class='badge'>"+loc.city+"</a>";
  };

  exports.getDate = function getDate(date) {
    var date = new Date(date);
    return date.getDate() + " " + this.translate("shortMonth"+date.getMonth()) + "<br/>" + date.getFullYear();
  };

})();
