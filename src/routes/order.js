const express = require("express");
const orderControler = require("../controller/order");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.get(
  "/viewOrders",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  orderControler.viewOrders
);
router.post(
  "/postOrder",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  orderControler.postOrder
);
router.delete(
  "/deleteOrder/:id",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  orderControler.deleteOrder
);
router.get(
  "/searchOrders",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  orderControler.searchOrders
);
module.exports = router;
