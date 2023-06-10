const express = require("express");
const router = express.Router();
orderController = require("../controller/ordersReport");

//get orders
router.get("/view-orders-report", orderController.getOrdersReport);
module.exports = router;
