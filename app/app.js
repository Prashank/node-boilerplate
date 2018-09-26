/**
 * Start up a single application server.
 */
"strict true";

const path = require("path");
const express = require("express");
const favicon = require("express-favicon");
const config = require("~/appconfig.js").GetApplicationConfiguration();
const log = require("~/applogger.js").GetApplicationLogger();
const isProduction = require("~/utils").isProduction;

if (!isProduction()) log.info("CONFIG : " + JSON.stringify(config));

const app = express();
const router = express.Router();

app.set("strict routing", false);
app.use(favicon(path.resolve(__dirname, "/public/images/favicon.ico")));
app.use(express.static(path.resolve(__dirname, "public")));

try {
  require("~/middlewares")(app, router);
} catch (e) {
  log.error("Error loading middlewares and routes!");
  throw e;
}

module.exports = app;