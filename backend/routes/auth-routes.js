const express = require("express");
const usersControllers = require("../controllers/user-controllers");

const router = express.Router();

function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
});

router.post("/login", usersControllers.login);