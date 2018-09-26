const path = require("path");
const glob = require("glob");

const files = glob.sync("**/*.js", { cwd: __dirname });

let apiDetails = {};

for (let i = 0; i < files.length; i++) {
  if (files[i] != path.basename(__filename)) {
    const fileApiDetails = require(path.resolve(__dirname, files[i]));
    const namespace = files[i].split(".js")[0];
    apiDetails = { ...apiDetails, [namespace]: { ...fileApiDetails } };
  }
}

module.exports = apiDetails;
