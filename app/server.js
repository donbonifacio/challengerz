var midgard = require('midgard.js');

midgard.language.setDefaultLanguage('en');
midgard.language.load('language/pt.json');
midgard.language.load('language/en.json');

require('../config/routes.js').load(midgard);
require('../config/database.js').init(midgard);

midgard.start(process.env.PORT || 3000);
