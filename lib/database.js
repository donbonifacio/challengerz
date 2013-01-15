(function database() {

  require('../config/database.js').init(midgard);

  exports.openCollection = function openCollection(collectionName, callback) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(midgard.dbconfig.connectionString, function mongoConnect(err, db) {
      if(err) throw err;
      db.collection(collectionName, callback);

    });
  };

})();	
