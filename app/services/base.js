const axios = require("axios");
const _ = require("lodash");
const AxiosError = require('axios-error');
const log = require("~/applogger.js").GetApplicationLogger();
const createURL = require("~/utils/url-generator");
const isProduction = require("~/utils");

class BaseService {
  constructor({ baseRoute, apiRoutes, baseUrl }) {
    this.baseRoute = baseRoute;
    this.routes = apiRoutes;
    this.baseUrl = baseUrl;
  }

  getHeaders({ headers = {}, forwardHeaders }, req){
    if (!_.isNull(req) && _.isObject(req)) {
      headers = { ...req.headers, ...headers };
      delete headers.host;
    } else if (forwardHeaders) {
      if (!isProduction()) {
        throw new Error("Client headers will not be passed to api's");
      } else {
        log.warn("Client headers will not be passed to api's");
      }
    }
    return headers;
  }

  getUrl(api, { params }) {
    const { url } = api;
    return createURL({ template: url, params });
  }

  async call({ action, params, query, body }, req) {
    const apiObject = this.routes[action] || {};
    const httpMethod = apiObject.method || "GET";
    const url = this.getUrl(apiObject, { params, query, body });
    const headers = this.getHeaders(apiObject, req);

    try {
      const response = await axios({
        url,
        body,
        method: httpMethod.toLowerCase(),
        headers,
        baseURL: this.baseUrl,
        params: query
      });
      return response.data;
    } catch (error) {
      let customError = new AxiosError(error);
      customError.status = customError.response && customError.response.status;
      throw customError;
    }
  }
}

module.exports = BaseService;
