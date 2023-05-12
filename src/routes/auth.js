const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/admin-signup", authController.adminSignUp);
router.post("/admin-login", authController.adminLogin);

router.put(
  "/changePassword",
  verifyToken,
  isAuthorized,
  authController.changePassword
);

module.exports = router;
