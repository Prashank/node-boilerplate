const config = require("~/appconfig.js").GetApplicationConfiguration();

const noop = () => {};
const identity = params => {
  return params;
};
const isProduction = () => {
  const env = config.env || process.env.NODE_ENV || "development";
  return ["prod", "production"].includes(env.toLowerCase());
};
module.exports = {
  noop,
  identity,
  isProduction
};
