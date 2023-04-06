const { application } = require("express");
const jwt = require("jsonwebtoken");
const secret = require("./config").secret;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id; //decoded contains the object
    next();
  });
};
module.exports = verifyToken;

//How to verify token?
//Wherever you need it, require the verifyToken.js
// file and put it at verifyToken after endpoint of your application
