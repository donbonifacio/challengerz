(function Event() {

  var database = require('../../lib/database.js');
  var EventSource = require('./eventSource.js');
  var EventTag = require('./eventTag.js');
  var Location = require('./location.js');
  var slugifier = require('slugifier');
  var Event = exports;
  var collectionName = 'events';

  Event.validate = function validate(obj, callback) {
    var errors = [];
    midgard.validator.string(errors, obj, 'slug');
    midgard.validator.string(errors, obj, 'owner');
    midgard.validator.string(errors, obj, 'name');
    midgard.validator.string(errors, obj, 'eventSourceSlug');
    midgard.validator.integer(errors, obj, 'edition');
    obj.countrySlug = slugifier.toSlug(obj.country);
    obj.regionSlug = slugifier.toSlug(obj.region);
    obj.citySlug = slugifier.toSlug(obj.city);
    if(obj._id) {
      obj.updatedAt = Date.now();
    } else {
      obj.createdAt = Date.now();
    }
    if(errors.length == 0 ) {
      EventSource.findBySlug(obj.eventSourceSlug, function(err, eventSource) {
        if(err) {
          errors.push('eventSourceNotFound');
        } else {
          obj.eventSource = eventSource;
        }
        if(!obj._id) {
          Event.getEvent(obj, function(err, event) {
            if(event) {
              errors.push('EventAlreadyExists');
            }
            callback(errors.length == 0, errors);
          });
        } else {
          callback(errors.length == 0, errors);
        }
      });
    } else {
      callback(errors.length == 0, errors);
    }
  };

  Event.createFromContext = function createFromContext(context, next) {
    context.apiResult = {};
    var model = context.requestModel;
    model.owner = context.currentUser.username;
    Event.validate(model, function(valid, errors) {
      if(valid) {
        context.apiResult.success = true;
        database.openCollection(collectionName, function(err, collection) {
          collection.save(model, function(err, result) {
            context.apiResult.event = model;
            EventTag.saveAll(model.eventTags);
            Location.saveFromEvent(model);
            next(context);
          });
        });
      } else {
        context.apiResult.success = false;
        context.apiResult.errors = errors;
        next(context);
      }
    });
  };

  var mongoQuery = function mongoQuery(params) {
    var filter = {};
    var tag = params['eventTag'];
    if(tag) {
      filter.eventTags = { $in: [tag] };
    }
    var location = params['location'];
    if(typeof(location) === 'string') {
      location = [location];
    }
    if(location ) {
      filter.countrySlug = location[0];
      if(location[1]) {
        filter.regionSlug = location[1];
      }
      if(location[2]) {
        filter.citySlug = location[2];
      }
    }
    filter.date = {$gte: Date.now()};
    console.log(filter);
    return filter;
  };

  Event.fetchLatest = function fetchLatest(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      collection.find(mongoQuery(context.params.eventsFilter)).limit(50).sort({date:1}).toArray(function(err, list) {
        context.fetchLatest = list;
        next(context);
      });
    });
  };

  Event.setPageTitle = function setPageTitle(context, event) {
    context.pageTitle = event.eventSource.name + ' » ' + event.edition + ' » ' + event.name;
  };

  Event.loadShowPageInfo = function loadShowPageInfo(context, next) {
    var query = {
      slug: context.params.eventSlug, 
      edition: context.params.eventEdition, 
      eventSourceSlug: context.params.eventSourceSlug 
    };
    Event.getEvent(query, function(err, event) {
      if(event) {
        context.params.event = event;
        Event.setPageTitle(context, event);
        next(context);
      } else {
        console.log({query: query, error: err});
      }
    });
  };

  Event.getEvent = function getEvent(params, callback) {
    database.openCollection(collectionName, function(err, collection) {
      var query = {
        slug: params.slug, 
        edition: params.edition, 
        eventSourceSlug: params.eventSourceSlug 
      };
      collection.findOne(query, callback);
    });
  };

})();
