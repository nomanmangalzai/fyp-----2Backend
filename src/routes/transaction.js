const express = require("express");
const TransactionController = require("../controller/transaction");
const router = express.Router();

router.post("/postTransaction", TransactionController.postTransaction);
router.get("/viewTransaction", TransactionController.viewTransaction);
router.get("/filterTransactions", TransactionController.filterTransactions);
router.delete(
  "/deleteTransaction/:id",
  TransactionController.deleteTransaction
);
router.get("/searchTransactions", TransactionController.searchTransactions);
module.exports = router;
