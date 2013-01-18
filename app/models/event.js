(function Event() {

  var database = require('../../lib/database.js');
  var EventSource = require('./eventSource.js');
  var EventTag = require('./eventTag.js');
  var Event = exports;
  var collectionName = 'events';

  Event.validate = function validate(obj, callback) {
    var errors = [];
    midgard.validator.string(errors, obj, 'slug');
    midgard.validator.string(errors, obj, 'owner');
    midgard.validator.string(errors, obj, 'name');
    midgard.validator.string(errors, obj, 'eventSourceSlug');
    midgard.validator.integer(errors, obj, 'edition');
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
        callback(errors.length == 0, errors);
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

  Event.fetchLatest = function fetchLatest(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      collection.find().limit(10).sort({createdAt:0}).toArray(function(err, list) {
        context.fetchLatest = list;
        next(context);
      });
    });
  };

  Event.setPageTitle = function setPageTitle(context, event) {
    context.pageTitle = event.eventSource.name + ' » ' + event.edition + ' » ' + event.name;
  };

  Event.loadShowPageInfo = function loadShowPageInfo(context, next) {
    database.openCollection(collectionName, function(err, collection) {
      var query = {
        slug: context.params.eventSlug, 
        edition: context.params.eventEdition, 
        eventSourceSlug: context.params.eventSourceSlug 
      };
      collection.findOne(query, function(err, event) {
        if(event) {
          context.params.event = event;
          Event.setPageTitle(context, event);
          next(context);
        } else {
          console.log({query: query, error: err});
        }
      });
    });
  };

})();
