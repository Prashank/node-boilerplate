const log = require("~/applogger.js").GetApplicationLogger();
const httpUtils = require("~/utils/http-utils.js");

function errorHandler(error, req, res, next) {
  // eslint-disable-line
  const message = error.message;
  const status = error.status;
  let stack = error.stack;
  log.error(stack);

  if (!req.query.debug) {
    stack = undefined
  } else {
    stack = stack.split("\n    ");
  }


  switch (status) {
    case 400:
      // should be internal server error since our code has sent a bad request
      httpUtils.respondBadRequest(req, res, message, stack);
      break;
    case 401:
      // should be internal server error since our code has sent a bad request
      httpUtils.respondUnauthenticated(req, res, message, stack);
      break;
    case 404:
      // should be internal server error since our code has asked for a non-existing endpoint
      error.routeNotFound
        ? httpUtils.respondNotFound(req, res, message, stack)
        : httpUtils.respondError(req, res, message, stack);
      break;
    case 501:
      // should be internal server error since third-party server is not available
      httpUtils.respondUnavailable(req, res, message, stack);
      break;
    case 500:
      // should be internal server error
      httpUtils.respondError(req, res, message, stack);
      break;
    default:
      httpUtils.respondError(req, res, message, stack);
  }
}

module.exports = function (app) {
  app.use(errorHandler);
};
