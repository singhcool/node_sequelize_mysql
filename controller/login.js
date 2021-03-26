const models = require("../models");
const jwt = require("jsonwebtoken");

function loginUser(req, res, next) {
  let email = req.body.email;
  models.admin.findOne({ where: { email: email } })
    .then(function (data) {
      if (data != null) {
        models.admin.findOne({ where: { password: req.body.password } }).then(
          function (data) {
            if (data != null) {
              let token = jwt.sign(data, process.env.JWT_SECRET, {
                expiresIn: "24h", //1 day
              });
              data["token"] = token;
              res.status(200).json({
                status: "success",
                data: data,
                message: "Logged users",
              });
            } else {
              res.status(200).json({
                status: "success",
                data: "Password Incorrect",
                message: "Logged users",
              });
            }
          }
        );
      } else {
        res.status(200).json({
          status: "success",
          data: "No User exist in Given Mail Id",
          message: "Logged users",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  loginUser: loginUser,
};
