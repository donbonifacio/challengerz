(function database() {

  exports.openCollection = function openCollection(collectionName, callback) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(midgard.dbconfig.connectionString, function mongoConnect(err, db) {
      if(err) throw err;
      db.collection(collectionName, callback);

    });
  };

})();	
