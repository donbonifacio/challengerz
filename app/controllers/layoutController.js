(function layoutController() {

  exports.main = function main(context) {
    context.include('layout#topMenu');
    context.include('midgard#trace');
    context.render();
  };

  exports.topMenu = function topMenu(context) {
    context.render();
  };

})();
