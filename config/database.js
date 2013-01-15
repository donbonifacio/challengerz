(function database() {

  var dbconfig = exports;

  dbconfig.development = function development() {
    return {
      connectionString: 'mongodb://localhost/challengerz'
    };
  };

  if(!midgard.isDevelopment) {
    dbconfig[midgard.env.NODE_ENV] = function fromVars() {
      return {
        connectionString: process.env.MONGOHQ_URL
      };
    };
  }

})();