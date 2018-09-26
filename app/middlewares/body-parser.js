/**
 * Middleware to handle body parsing
 */

const bodyParser = require("body-parser");
const httpUtils = require("~/utils/http-utils.js");
const log = require("~/applogger.js").GetApplicationLogger();

module.exports = function(app) {
  // parse application/json as json
  app.use(bodyParser.json({ limit: "5mb" }));
  // parse text/plain as json
  app.use(bodyParser.json({ type: "text/plain", limit: "5mb" }));
  // parse application/x-www-form-urlencoded as urlencoded
  app.use(
    bodyParser.urlencoded({
      type: "application/x-www-form-urlencoded",
      limit: "5mb",
      extended: true
    })
  );

  // body parsing error
  app.use(function(err, req, res, next) {
    log.error(`req=${req.id} : Body parsing error -> ${err}`);
    httpUtils.respondBadRequest(req, res, "Invalid JSON.");
    next();
  });
};
