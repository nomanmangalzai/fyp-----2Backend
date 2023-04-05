const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const verifyToken = require("../controller/verifyToken");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.put("/changePassword", authController.changePassword);
router.post("/profile", verifyToken, authController.profile);

module.exports = router;
