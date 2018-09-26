const apiHandlers = {
  ["test/testRoute"]: () => ({
    controller: "test/testRoute",
    methods: ["GET"],
    route: "/test"
  })
};

module.exports = apiHandlers;
