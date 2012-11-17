(function() {
	
	exports.resolve = function(controllerName, actionName) {
		var controller = require(this.getControllerPath(controllerName));
		return function(request, response) {
			var context = {
				request: request,
				response: response
			}
			controller[actionName](context);
		};
	}

	exports.getControllerPath = function(controllerName) {
		return "../app/controllers/" + controllerName + "Controller.js";
	}

})();
