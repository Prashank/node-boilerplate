const httpUtils = require("~/utils/http-utils.js");
const { identity, noop } = require("~/utils");
// const CustomError = require("~/utils/custom-error");
const responseHandler = async ({
  req,
  res,
  next,
  parser = identity,
  handler = noop
}) => {
  try {
    let serviceResponse = await handler(req);
    let parsedResponse = parser(serviceResponse) || {};
    httpUtils.respondSuccess(req, res, parsedResponse);
  } catch (error) {
    // const newError = new CustomError(error);
    next(error);
  }
};

module.exports = responseHandler;
