/**
 * Utility class to generate unique request ID
 * Format: (app).(ipv4).(time-in-ms).(randstring)
 */
"use strict";

var config = require("~/appconfig.js").GetApplicationConfiguration();

// application
var APP = "APP";
if (config.request && config.request.app) APP = config.request.app;

// ipv4
var IP_ADDRESS = "IP";
const ifaces = require("os").networkInterfaces();
Object.keys(ifaces).forEach(function(ifname) {
  ifaces[ifname].forEach(function(iface) {
    if (IP_ADDRESS !== "IP") return;
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    IP_ADDRESS = iface.address;
    IP_ADDRESS = IP_ADDRESS.split(".").join("-");
  });
});

// randstring
// default charset to alphanumeric
var CHARSET = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
if (config.request && config.request.charset) CHARSET = config.request.charset;
var RANDOM_LENGTH = 5;
if (config.request && config.request.length)
  RANDOM_LENGTH = config.request.length;
function randstring() {
  const value = [];
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    value[i] = CHARSET.charAt(Math.floor(Math.random() * CHARSET.length));
  }
  return value.join("");
}

function generate() {
  return `${APP}.${IP_ADDRESS}.${new Date().getTime()}.${randstring()}`;
}
module.exports.GenerateRequestID = generate;
