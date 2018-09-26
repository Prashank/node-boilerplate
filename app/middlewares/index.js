"use strict";
const Logger = require("~/applogger.js");
const cookieParser = require("cookie-parser");
const log = Logger.GetApplicationLogger();
const reqIdGenerator = require("~/utils/reqid-generator.js");
module.exports = function(app, router) {
  log.info("Initializing middlewares.");

  app.use(function(req, res, next) {
    const reqId = reqIdGenerator.GenerateRequestID();
    req.id = reqId;
    res.set("request-id", reqId);
    next();
  });

  app.use(cookieParser());

  app.use((req, res, next) => {
    req.log = Logger.CreateNewRequestLogger(req);
    next();
  });

  require("./body-parser.js")(app);
  require("./axios-interceptor");
  require("./logging")(app);
  require("./allow-cross-domain")(app);

  require("~/routes")(router);
  app.use("/", router);

  require("./notfound")(app);
  require("./error-handler")(app);
  require("./uncaught-exception")(app);
};
