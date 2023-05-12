const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.post("/signup", authController.deleteIsAdmin);
router.post("/login", authController.login);
router.put(
  "/changePassword",
  verifyToken,
  isAuthorized,
  authController.changePassword
);

module.exports = router;
