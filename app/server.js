var midgard = require('midgard.js');

midgard.language.setDefaultLanguage('en');
midgard.language.load('language/pt.json');
midgard.language.load('language/en.json');

require('../config/routes.js').load(midgard);

var dbconfig = require('../config/database.js');
midgard.dbconfig = dbconfig[midgard.env];
if(!midgard.dbconfig) {
  throw new Error('No dbcondig for ' + midgard.env);
}

midgard.start(process.env.PORT || 3000);
