const apiHandlers = {
  ["authentication/auth"]: () => ({
    controller: "authentication/auth",
    methods: ["GET", "POST"],
    route: "/auth"
  }),
  ["authentication/login"]: () => ({
    controller: "authentication/login",
    methods: ["GET"],
    route: "/login"
  })
};

module.exports = apiHandlers;
