const config = require("~/appconfig.js").GetApplicationConfiguration();
const { apiRoutes, baseRoute } = require("~/config/apiConfig").test;
const BaseService = require("./base");

const baseUrl = config.service.test;
class TestService extends BaseService {
  constructor(apiRoutes) {
    super(apiRoutes);
  }

  list(req) {
    return this.call({ action: "list" }, req);
  }
}

module.exports = new TestService({ apiRoutes, baseRoute, baseUrl });
