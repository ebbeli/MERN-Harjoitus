const config = require("../config/auth.config");
const User = require("../models/user");

var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req);
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = req.body.password == user.password ? "True" : "False";

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.name,
      email: user.email,
    });
  });
};

exports.login = login;
