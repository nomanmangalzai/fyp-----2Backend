const express = require("express");
const TransactionController = require("../controller/transaction");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");

router.post(
  "/postTransaction",
  verifyToken,
  isAuthorized,
  TransactionController.postTransaction
);
router.get(
  "/viewTransaction",
  verifyToken,
  isAuthorized,
  TransactionController.viewTransaction
);
router.get(
  "/filterTransactions",
  verifyToken,
  isAuthorized,
  TransactionController.filterTransactions
);
router.delete(
  "/deleteTransaction/:id",
  verifyToken,
  isAuthorized,
  TransactionController.deleteTransaction
);
router.get(
  "/searchTransactions",
  verifyToken,
  isAuthorized,
  TransactionController.searchTransactions
);
module.exports = router;
