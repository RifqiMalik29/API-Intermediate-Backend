const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearearToken = req.header("auth-token");
  const token = bearearToken.split(" ")[1];
  const secretKey = process.env.SECRET_KEY;
  if (!bearearToken) {
    res.status(404).send({
      success: false,
      message: "NOT FOUND",
    });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (!err) {
        if (decoded.role_id == "20") {
          next();
        } else if (decoded.id == req.params.id) {
          next();
        } else {
          res.status(403).send({
            success: false,
            message: "Error Forbidden",
          });
        }
      } else {
        res.status(401).send({
          success: false,
          message: err,
        });
      }
    });
  }
};

module.exports = verifyToken;
