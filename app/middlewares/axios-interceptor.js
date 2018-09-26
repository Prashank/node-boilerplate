const reqIdGenerator = require("~/utils/reqid-generator.js");
const log = require("~/applogger.js").GetApplicationLogger();
const axios = require("axios");
axios.interceptors.request.use(config => {
  config.requestStartAt = new Date();
  config.requestId = reqIdGenerator.GenerateRequestID();
  log.debug(
    `service request: request-id: ${
      config.requestId
    } ${config.method.toUpperCase()} ${config.baseURL}${
      config.url
    }; data: ${JSON.stringify(config.data)}`
  );
  return config;
});

axios.interceptors.response.use(response => {
  const duration = new Date() - response.config.requestStartAt;
  log.debug(
    `service response: request-id: ${response.config.requestId} ${
      response.status
    } ${response.statusText}; duration: ${duration} ms; data: ${JSON.stringify(
      response.data
    )}`
  );
  return response;
});
