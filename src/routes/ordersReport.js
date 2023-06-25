const express = require("express");
const router = express.Router();
orderController = require("../controller/ordersReport");

//get orders
router.get("/view-orders-report", orderController.getOrdersReport);
router.get("/stock-out-of-stock-api", orderController.stockOutOfStockItems);
router.get("/orders-per-week", orderController.ordersPerWeek);
router.get("/orders-per-week", orderController.ordersPerWeek);
router.get("/orders-per-month", orderController.ordersPerMonth);

module.exports = router;
