const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");
const { check } = require("express-validator");
const auth = require("../models/auth");

router.post("/admin-signup", authController.signup);
router.post(
  "/admin-login",
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
router.put(
  "/admin-account-management/:id",
  authController.adminAccountManagement
);

// Below are routes for customer
router.post("/customer-signup", authController.customerSignup);
router.post("/customer-login", authController.customerLogin);
router.put(
  "/customer-account-management/:id",
  authController.customerAccountManagement
);

module.exports = router;
