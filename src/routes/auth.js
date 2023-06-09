const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");
const { check } = require("express-validator");
const auth = require("../models/auth");

//debugging below
const multer = require("multer");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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
router.post("/customer-login", authController.buyerLogin);
router.post("/customer-send-otp", authController.sendOTP);
router.put(
  "/customer-account-management/:id",
  upload.single("image"),
  authController.customerAccountManagement
);

module.exports = router;
