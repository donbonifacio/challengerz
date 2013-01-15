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

  dbconfig.init = function init(midgard) {
    if(midgard.dbconfig) {
      return;
    }
    var func = dbconfig[midgard.env];
    if(!func) {
      throw new Error('No dbcondig for ' + midgard.env);
    }
    midgard.dbconfig = func();
  };

})();
