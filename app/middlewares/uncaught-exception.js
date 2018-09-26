const log = require("~/applogger.js").GetApplicationLogger();
const httpUtils = require("~/utils/http-utils.js");

module.exports = function(app) {
  app.use(function(err, req, res, next) {
    log.error(`req=${req.id} : Uncaught error -> ${err}`);
    log.error(err.stack);
    httpUtils.respondError(req, res, "Something broke!");
    next();
  });
};
