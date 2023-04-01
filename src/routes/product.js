const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router.post("/postProduct", productController.postProduct);
router.get("/viewProducts", productController.viewProducts);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.put("/updateProduct/:id", productController.updateProduct);
module.exports = router;
