const path = require("path");
const glob = require("glob");

const files = glob.sync("**/*.js", { cwd: __dirname });

let exposedRoutes = {};

for (let i = 0; i < files.length; i++) {
  if (files[i] != path.basename(__filename)) {
    let fileExposedRoutes = require(path.resolve(__dirname, files[i]));
    exposedRoutes = { ...exposedRoutes, ...fileExposedRoutes };
  }
}

module.exports = exposedRoutes;
