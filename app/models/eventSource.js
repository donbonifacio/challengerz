(function EventSource() {

  exports.createFromContext = function createFromContext(context, next) {
    next(context);
  };

})();
