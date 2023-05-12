const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");
//file upload
const multer = require("multer");
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postProduct",
  upload.single("image"),
  productController.postProduct
);
router.get(
  "/viewProducts",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  productController.viewProducts
);
router.get("/product-description/:id", productController.productDescription);
router.delete(
  "/deleteProduct/:id",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  productController.deleteProduct
);
router.put(
  "/updateProduct/:id",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  productController.updateProduct
);
router.get(
  "/searchProducts",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  productController.searchProducts
);
router.get(
  "/filterProducts",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  productController.filterProducts
);
module.exports = router;
