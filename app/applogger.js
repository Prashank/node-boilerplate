"use strict";

var moment = require("moment");
var util = require("util");
var winston = require("winston");
var config = require("~/appconfig.js").GetApplicationConfiguration();

/* exported methods*/
module.exports.CreateNewRequestLogger = function(ctx) {
  return new RequestLogger(ctx);
};

var applog = null;
module.exports.GetApplicationLogger = function() {
  applog = applog || new ApplicationLogger();
  return applog;
};

/* instantitate and configure logger */
var log = new winston.Logger();
if (
  config &&
  config.log &&
  config.log.application &&
  config.log.application != "console"
) {
  // log out to file
  log.add(winston.transports.File, {
    filename: config.log.application,
    level: config.log.level,
    json: false,
    formatter: function(options) {
      return util.format(
        "[%s] %s (%d) - %s",
        options.level.toUpperCase(),
        moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
        process.pid,
        undefined !== options.message ? options.message : ""
      );
    }
  });
} else {
  // default to console logging
  log.add(winston.transports.Console, {
    level: config.log.level,
    json: false,
    formatter: function(options) {
      return util.format(
        "[%s] %s (%d) - %s",
        options.level.toUpperCase(),
        moment().format("YYYY-MM-DD HH:mm:ss.SSS ZZ"),
        process.pid,
        undefined !== options.message ? options.message : ""
      );
    }
  });
}

/* Base Logger */
function Logger() {}
Logger.prototype.log = function(level, message) {
  log.log(level, message);
};
Logger.prototype.error = function(message) {
  this.log("error", message);
};
Logger.prototype.warn = function(message) {
  this.log("warn", message);
};
Logger.prototype.info = function(message) {
  this.log("info", message);
};
Logger.prototype.debug = function(message) {
  this.log("debug", message);
};
Logger.prototype.trace = function(message) {
  this.log("verbose", message);
};

/* Application Logger */
function ApplicationLogger() {
  Logger.call(this);
}
ApplicationLogger.prototype = Object.create(Logger.prototype);
ApplicationLogger.prototype.constructor = ApplicationLogger;

/* Request Logger */
function RequestLogger(ctx) {
  Logger.call(this);
  this.ctx = ctx;
}
RequestLogger.prototype = Object.create(Logger.prototype);
RequestLogger.prototype.constructor = RequestLogger;
RequestLogger.prototype.log = function(level, message) {
  log.log(level, `req=${this.ctx.id} > ${message}`);
};
