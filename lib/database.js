(function database() {

  exports.openCollection = function openCollection(collectionName, callback) {
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect('mongodb://localhost/challengerz', function mongoConnect(err, db) {
      if(err) throw err;
      db.collection(collectionName, callback);

    });
  };

})();	
