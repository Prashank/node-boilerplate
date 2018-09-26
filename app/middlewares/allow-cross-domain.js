const config = require("~/appconfig.js").GetApplicationConfiguration();
const log = require("~/applogger.js").GetApplicationLogger();

module.exports = function(app) {
  if (config.server.cors) {
    log.info("Initializing cors middlewares.");

    const allowCrossDomain = function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    };

    app.use(allowCrossDomain);
  }
};
