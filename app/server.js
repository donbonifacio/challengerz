var midgard = require("midgard.js");

require('../config/routes.js').load(midgard);

midgard.start(process.env.PORT || 3000);
