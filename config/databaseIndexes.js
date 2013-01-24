
db.getCollection('events').ensureIndex({slug:1, edition:1, eventSourceSlug:1});
db.getCollection('events').ensureIndex({loc:'2d'});
db.getCollection('events').ensureIndex({date:1});

db.getCollection('eventTags').ensureIndex({slug:1});
