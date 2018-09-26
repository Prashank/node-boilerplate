const config = require("~/appconfig.js").GetApplicationConfiguration();
const { apiRoutes, baseRoute } = require("~/config/apiConfig").authentication;
const BaseService = require("./base");

const baseUrl = config.service.authentication;
class AutheticationService extends BaseService {
  constructor(apiRoutes) {
    super(apiRoutes);
  }

  async auth(req) {
    const response = await this.call({ action: "auth" }, req);
    return response;
  }

  login(req) {
    return this.call({ action: "login" }, req);
  }
}

module.exports = new AutheticationService({ apiRoutes, baseRoute, baseUrl });
