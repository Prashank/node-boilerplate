const Route = require("route-parser");
const qs = require("qs");

const createURL = ({ template, params, query }) => {
  const route = new Route(template);
  const urlPath = route.reverse(params);
  const queryString = qs.stringify(query);

  const url = queryString === "" ? urlPath : urlPath + "?" + queryString;

  return url;
};

module.exports = createURL;
