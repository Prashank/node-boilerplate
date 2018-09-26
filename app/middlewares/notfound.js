function notFoundHandler(req, res, next) {
  const customError = new Error("Route Not Found");
  customError.status = 404;
  customError.routeNotFound = true;
  next(customError);
}

module.exports = function(app) {
  app.use(notFoundHandler);
};
