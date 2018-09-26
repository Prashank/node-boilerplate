const apiHandlers = {
  ["health/status"]: () => ({
    controller: "health/status",
    methods: ["GET"],
    route: "/status"
  })
};

module.exports = apiHandlers;
