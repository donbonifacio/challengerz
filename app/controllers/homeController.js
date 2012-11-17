(function() {

	exports.index = function(context) {
		context.response.write("Hello World");
		context.response.end();
	}

})();
