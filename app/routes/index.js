/**
 * Require routes recursively.
 */
"use strict";

const log = require("~/applogger.js").GetApplicationLogger();
const config = require("~/appconfig").GetApplicationConfiguration();
const authMiddleware = require("~/middlewares/route-authentication");
const allRoutes = require("~/config/routesConfig");

const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

module.exports = function(router) {
  log.info("Initializing routes.");

  for (const routeObj in allRoutes) {
    const routeDetails = allRoutes[routeObj]();
    const routeHandler = require("~/routes/" + routeDetails.controller);

    if (routeHandler) {
      const { methods = ["GET"], auth = true } = routeDetails;
      let routes = routeDetails.route;

      if (!Array.isArray(routes)) {
        routes = [routes];
      }

      routes.forEach(route => {
        const parserRouter = router.route(route);

        const correctMethods = methods.filter(m =>
          allowedMethods.includes(m.toUpperCase())
        );
        correctMethods.forEach(method => {
          if (auth && config.server.authentication) {
            parserRouter[method.toLowerCase()](
              authMiddleware,
              routeHandler.handler
            );
          } else {
            parserRouter[method.toLowerCase()](routeHandler.handler);
          }
        });
      });
    }
  }
};
