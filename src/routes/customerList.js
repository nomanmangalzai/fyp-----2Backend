const express = require("express");
const customerListController = require("../controller/customerList");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");

router.get(
  "/viewAllCustomers",
  verifyToken,
  isAuthorized,
  customerListController.viewAllCustomers
);
router.get(
  "/deleteCustomer/:id",
  verifyToken,
  isAuthorized,
  customerListController.deleteCustomer
);

module.exports = router;
