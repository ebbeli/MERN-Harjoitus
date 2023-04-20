const express = require("express");
const storiesControllers = require("../controllers/auth-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/login", authController.login);
};
