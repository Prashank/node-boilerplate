const log = require("~/applogger.js").GetApplicationLogger();
const responseHandler = require("~/utils/response-handler.js");
const TestService = require("~/services/test");

function parser() {}

module.exports.handler = async (req, res, next) => {
  log.debug("Initializing Resource routes.");
  responseHandler({
    req,
    res,
    next,
    parser,
    handler: TestService.list.bind(TestService)
  });
};
