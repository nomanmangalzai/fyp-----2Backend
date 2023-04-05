const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.put("/changePassword", authController.changePassword);

module.exports = router;
