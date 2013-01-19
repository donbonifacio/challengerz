(function Location() {

  var Location = exports;
  var database = require('../../lib/database.js');
  var collectionName = 'locations';
  var slugifier = require('slugifier');
  var _ = midgard._;

  Location.saveFromEvent = function saveFromEvent(e) {
    database.openCollection(collectionName, function(err, collection) {
      collection.findOne({citySlug: slugifier.toSlug(e.city)}, function(err, location) {
        if(!location) {
          collection.save({
            country: e.country,
            countrySlug: slugifier.toSlug(e.country),
            region: e.region,
            regionSlug: slugifier.toSlug(e.region),
            city: e.city,
            citySlug: slugifier.toSlug(e.city),
            createdAt: Date.now()
          }, midgard.doNothing)
        }
      });
    });
  };

})();
