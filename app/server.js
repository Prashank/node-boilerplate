/**
 * Start up a single application server.
 */
"strict true";

require("module-alias/register");
require("dotenv").config();

const config = require("~/appconfig").GetApplicationConfiguration();
const log = require("~/applogger").GetApplicationLogger();
const { shutdown, testServer } = require("~/utils/handle-server");

const app = require("~/app");

var server = app.listen(config.server.port);
log.info("Server listening on port " + config.server.port + ".");

process.on("SIGTERM", shutdown.bind(this, server));
process.on("SIGINT", shutdown.bind(this, server));

process.on("uncaughtException", function(err) {
  log.error(`Uncaught error -> ${err}`);
  log.error(err.stack);
});

if (config.server.test) {
  testServer();
}
