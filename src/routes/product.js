const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.post(
  "/postProduct",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.postProduct
);
router.get(
  "/viewProducts",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.viewProducts
);
router.delete(
  "/deleteProduct/:id",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.deleteProduct
);
router.put(
  "/updateProduct/:id",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.updateProduct
);
router.get(
  "/searchProducts",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.searchProducts
);
router.get(
  "/filterProducts",
  verifyToken,
  isAuthorized,
  isAdmin,
  productController.filterProducts
);
module.exports = router;
