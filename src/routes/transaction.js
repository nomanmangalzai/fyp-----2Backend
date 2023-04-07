const express = require("express");
const TransactionController = require("../controller/transaction");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.post(
  "/postTransaction",
  verifyToken,
  isAuthorized,
  isAdmin,
  TransactionController.postTransaction
);
router.get(
  "/viewTransaction",
  verifyToken,
  isAuthorized,
  isAdmin,
  TransactionController.viewTransaction
);
router.get(
  "/filterTransactions",
  verifyToken,
  isAuthorized,
  isAdmin,
  TransactionController.filterTransactions
);
router.delete(
  "/deleteTransaction/:id",
  verifyToken,
  isAuthorized,
  isAdmin,
  TransactionController.deleteTransaction
);
router.get(
  "/searchTransactions",
  verifyToken,
  isAuthorized,
  isAdmin,
  TransactionController.searchTransactions
);
module.exports = router;
