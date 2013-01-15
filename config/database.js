(function database() {

  var dbconfig = exports;

  dbconfig.development = function development() {
    return {
      connectionString: 'mongodb://localhost/challengerz'
    };
  }

})();
