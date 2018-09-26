const axios = require("request");
const config = require("~/appconfig.js").GetApplicationConfiguration();
const log = require("~/applogger.js").GetApplicationLogger();

var terminating = false;

function shutdown(server) {
  if (terminating) {
    log.info("Server closed. Waiting for internal processing to complete.");
  } else {
    log.info("Shutting down server. No more requests will be accepted.");
    server.close(function() {
      terminating = true;
      log.info("Server closed. Waiting for internal processing to complete.");
    });
  }
}

async function check(port, delay) {
  const url = "http://localhost:" + port + "/status";
  log.debug("Testing server startup after " + delay + " ms.");
  try {
    const response = await axios.get(url);
    log.debug("Server startup successful.");
    log.debug(url + " says : " + response);
  } catch (error) {
    log.error(
      "Server startup failed. Check configuration and port availability."
    );
    shutdown();
  }
}

function testServer() {
  const { testDelayTime: delay, port } = config.server;
  setTimeout(check.bind(null, port, delay), delay);
}

module.exports = {
  testServer,
  shutdown
};
