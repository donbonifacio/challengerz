var midgard = require("midgard.js");

require('../config/routes.js').load(midgard);

midgard.start(3000);
