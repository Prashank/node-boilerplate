const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const getenv = require("getenv");
const _ = require("lodash");

let config = null;

function get() {
  if (!config) {
    config = load();
    return config;
  }
  return config;
}

function convertDelimiterStringToObject(str, value, delimiter = ".") {
  const result = {};
  const indexOfDelimiter = str.indexOf(delimiter);
  if (indexOfDelimiter !== -1) {
    result[str.slice(0, indexOfDelimiter)] = convertDelimiterStringToObject(
      str.slice(indexOfDelimiter + 1),
      value
    );
  } else {
    result[_.camelCase(str)] = value;
  }
  return result;
}

function load() {
  const config = getenv.multi({
    env: ["NODE_ENV", "development", "string"],
    "log.level": ["LOG.LEVEL", "debug", "string"],
    "log.request": ["LOG.REQUEST", true, "bool"],
    "log.response": ["LOG.RESPONSE", true, "bool"],
    "log.access": ["LOG.ACCESS", "dev-access.log", "string"],
    "log.application": ["LOG.APPLICATION", "console", "string"],
    "server.cors": ["SERVER.CORS", false, "bool"],
    "server.port": ["SERVER.PORT", 7777, "int"],
    "server.test": ["SERVER.TEST", true, "bool"],
    "server.authentication": ["SERVER.AUTHENTICATION", true, "bool"],
    "server.test_delay_time": ["SERVER.TEST_DELAY_TIME", 5000, "int"]
  });
  const envConfig = dotenv.parse(
    fs.readFileSync(path.resolve(__dirname, "..", ".env"))
  );
  const configPairs = Object.entries(config);
  const envPairs = Object.entries(envConfig);
  let fullConfig = {};
  for (let [key, value] of envPairs) {
    key = key.toLowerCase();
    if (config[key.toLowerCase()]) continue;
    if (key.includes(".")) {
      fullConfig = _.merge(
        fullConfig,
        convertDelimiterStringToObject(key, value)
      );
    } else {
      fullConfig[_.camelCase(key)] = value;
    }
  }
  for (const [key, value] of configPairs) {
    if (key.includes(".")) {
      fullConfig = _.merge(
        fullConfig,
        convertDelimiterStringToObject(key, value)
      );
    } else {
      fullConfig[_.camelCase(key)] = value;
    }
  }

  return fullConfig;
}

module.exports = {
  GetApplicationConfiguration: get
};
