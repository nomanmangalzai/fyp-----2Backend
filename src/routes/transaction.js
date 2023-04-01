const express = require("express");
const TransactionController = require("../controller/transaction");
const router = express.Router();

router.post("/postTransaction", TransactionController.postTransaction);
router.get("/viewTransaction", TransactionController.viewTransaction);
module.exports = router;
