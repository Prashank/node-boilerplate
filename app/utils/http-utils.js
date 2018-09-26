"use strict";

function setHeader(res, req) {
  res.setHeader("request-id", req.id);
}

module.exports.respondSuccess = function (req, res, data) {
  setHeader(res, req);
  if (typeof data == "string") {
    res.type("text/plain; charset=utf-8");
    res.status(200).end(data);
  } else {
    res.type("application/json; charset=utf-8");
    res.status(200).end(JSON.stringify(data));
  }
};

module.exports.respondBadRequest = function (req, res, reason) {
  var json = {
    message: reason,
    stack
  };
  setHeader(res, req);
  res.type("application/json");
  res.status(400).end(JSON.stringify(json));
};

module.exports.respondUnauthenticated = function (req, res, reason, stack) {
  var json = {
    message: reason,
    stack
  };
  setHeader(res, req);
  res.type("application/json");
  res.status(401).end(JSON.stringify(json));
};

module.exports.respondNotFound = function (req, res, reason, stack) {
  var json = {
    message:
      reason ||
      ">_< We looked real hard but did not find what you were looking for!",
    stack
  };
  setHeader(res, req);
  res.type("application/json");
  res.status(404).end(JSON.stringify(json));
};

module.exports.respondError = function (req, res, reason, stack) {
  var json = {
    message: reason,
    stack
  };
  setHeader(res, req);
  res.type("application/json");
  res.status(500).end(JSON.stringify(json));
};

module.exports.respondUnavailable = function (req, res, reason, stack) {
  var json = {
    message:
      reason ||
      "This service is not available yet, but we are most definitely working on it. You might want to bet some money on it!",
    stack
  };
  setHeader(res, req);
  res.type("application/json");
  res.status(501).end(JSON.stringify(json));
};