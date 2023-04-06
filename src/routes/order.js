const express = require("express");
const orderControler = require("../controller/order");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");

router.get("/viewOrders", verifyToken, isAuthorized, orderControler.viewOrders);
router.post("/postOrder", verifyToken, isAuthorized, orderControler.postOrder);
router.delete(
  "/deleteOrder/:id",
  verifyToken,
  isAuthorized,
  orderControler.deleteOrder
);
router.get(
  "/searchOrders",
  verifyToken,
  isAuthorized,
  orderControler.searchOrders
);
module.exports = router;
