const express = require("express");
const customerListController = require("../controller/customerList");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.get(
  "/viewAllCustomers",
  verifyToken,
  isAuthorized,
  isAdmin,
  customerListController.viewAllCustomers
);
router.get(
  "/deleteCustomer/:id",
  verifyToken,
  isAuthorized,
  isAdmin,
  customerListController.deleteCustomer
);

module.exports = router;
