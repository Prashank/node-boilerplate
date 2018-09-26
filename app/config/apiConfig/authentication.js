const baseRoute = "/";

const apiRoutes = {
  auth: {
    method: "GET",
    url: "/auth"
  },
  login: {
    method: "POST",
    url: "/login"
  }
};

module.exports = { baseRoute, apiRoutes };
