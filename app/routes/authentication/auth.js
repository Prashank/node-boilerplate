// const log = require('~/applogger.js').GetApplicationLogger();
const responseHandler = require("~/utils/response-handler.js");
const AuthService = require("~/services/authentication");

function parser() {}

function main(req) {
  return AuthService.auth(req);
}

module.exports.handler = async (req, res, next) => {
  responseHandler({
    req,
    res,
    next,
    parser,
    handler: main
  });
};
