db.getCollection('events').ensureIndex({loc:'2d'});
db.getCollection('events').ensureIndex({createdAt:1});
