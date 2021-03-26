const jwt = require("jsonwebtoken");
const models = require("../models");

function checkJwt(req, res, next) {
  const jwtToken = req.headers["authorization"];
  if (jwtToken) {
    jwt.verify(jwtToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) { 
        next(err);
      }else{
      const token = jwt.decode(req.headers["authorization"]);
      models.admin.findOne({ where: { id: token.id } })
        .then(function (data) {
          if (data != "null") {
            next();
          } else {
            res.status(400).json({
              status: "error",
              message: "Worng Invalid Token",
            });
          }
        })
        .catch((error) => {
          next(error);
        });
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "Jwt Token Missing",
    });
  }
}
module.exports = {
  checkJwt: checkJwt,
};
