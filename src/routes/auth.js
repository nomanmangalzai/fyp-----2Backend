const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");
const { check } = require("express-validator");

router.post("/signup", authController.signup);
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);
// router.post("/admin-signup", authController.adminSignUp);
// router.post("/admin-login", authController.adminLogin);

// router.put(
//   "/changePassword",
//   verifyToken,
//   isAuthorized,
//   authController.changePassword
// );

module.exports = router;
