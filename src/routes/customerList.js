const express = require("express");
const customerListController = require("../controller/customerList");
const router = express.Router();

router.get("/viewAllCustomers", customerListController.viewAllCustomers);
router.get("/deleteCustomer/:id", customerListController.deleteCustomer);

module.exports = router;
