var midgard = require('midgard.js');

require('../config/routes.js').load(midgard);

midgard.language.setDefaultLanguage('en');
midgard.language.load('language/pt.json');
midgard.language.load('language/en.json');

midgard.start(process.env.PORT || 3000);
