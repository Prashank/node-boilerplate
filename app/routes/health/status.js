/**
 * Status routes.
 */
"use strict";

const responseHandler = require("~/utils/response-handler.js");

module.exports.handler = function(req, res, next) {
  responseHandler({
    req,
    res,
    next,
    handler: () => {
      return {
        message: "Still alive!"
      };
    }
  });
};
