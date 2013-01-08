(function layoutController() {

  exports.main = function main(context) {
    context.include('midgard#trace');
    context.render();
  }

})();
