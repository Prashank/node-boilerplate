/**
 * Middleware to handle request logging
 */
"use strict";

const config = require("~/appconfig.js").GetApplicationConfiguration();
const log = require("~/applogger.js").GetApplicationLogger();

module.exports = function(app) {
  log.info("Initializing logging middlewares.");

  if (config.log && config.log.request) {
    log.debug(
      "Logging middleware will log incoming requests to application log."
    );
    app.use((req, res, next) => {
      req.log.info(
        `Incoming > ${req.method} ${req.url} ;; Headers -> ${JSON.stringify(
          req.headers
        )} ;; Body-> ${JSON.stringify(req.body)}`
      );
      next();
    });
  }

  if (config.log && config.log.response) {
    log.debug(
      "Logging middleware will log outgoing responses to application log."
    );
    app.use(async function(req, res, next) {
      req.start_ts = req.start_ts || new Date();
      await next();
      req.log.info(
        `Outgoing > ${req.method} ${req.url} ${res.statusCode} ${new Date() -
          req.start_ts} ms ;; Body -> ${JSON.stringify(res.body)}`
      );
    });
  }

  if (config.log && config.log.access) {
    log.debug("Logging middleware will create access log.");

    // configure access log
    const morgan = require("morgan");
    const fs = require("fs");
    const log_pattern =
      ':id - :req[x-forwarded-for] [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';
    const accessLogStream = fs.createWriteStream(config["log"]["access"], {
      flags: "a"
    });

    morgan.token("id", function getId(req) {
      return req.id;
    });

    // skip status requests
    app.use(
      morgan(log_pattern, {
        stream: accessLogStream
      })
    );
  }
};
