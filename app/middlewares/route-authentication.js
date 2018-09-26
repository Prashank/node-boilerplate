const log = require("~/applogger.js").GetApplicationLogger();

const AuthService = require("~/services/authentication");

log.debug("Initializing authentication middlewares");

module.exports = async function(req, res, next) {
  try {
    const { auth } = await AuthService.auth(req);
    res.locals.authenticated = auth;
    next();
  } catch (err) {
    next(err);
  }
};
