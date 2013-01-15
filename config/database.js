(function database() {

  var dbconfig = exports;

  dbconfig.development = function development() {
    return {
      connectionString: 'mongodb://localhost/challengerz'
    };
  };

  if(!midgard.isDevelopment) {
    var conn = process.env.MONGOHQ_URL;
    if(!conn) {
      throw new Error('No conn string found for MONGOHQ_URL');
    }
    dbconfig[midgard.env] = function fetchOutside() {
      return {
        connectionString: conn
      };
    };
  }

})();
