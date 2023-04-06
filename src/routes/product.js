const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");

router.post(
  "/postProduct",
  verifyToken,
  isAuthorized,
  productController.postProduct
);
router.get(
  "/viewProducts",
  verifyToken,
  isAuthorized,
  productController.viewProducts
);
router.delete(
  "/deleteProduct/:id",
  verifyToken,
  isAuthorized,
  productController.deleteProduct
);
router.put(
  "/updateProduct/:id",
  verifyToken,
  isAuthorized,
  productController.updateProduct
);
router.get(
  "/searchProducts",
  verifyToken,
  isAuthorized,
  productController.searchProducts
);
router.get(
  "/filterProducts",
  verifyToken,
  isAuthorized,
  productController.filterProducts
);
module.exports = router;
