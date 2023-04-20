const express = require("express");
const productListingController = require("../../controller/client_side APIs/productListing");
const router = express.Router();
const verifyToken = require("../../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../../controller/isAuthorized");
const isAdmin = require("../../controller/isAdmin");

// router.post("/showProducts", productListingController.showProducts);
router.get("/show-products", productListingController.showProducts);
router.get("/shop-by-categories", productListingController.shopByCategories);
router.post("/add-to-cart", productListingController.addToCart);
router.put("/update-quantity", productListingController.updateQuantity);
module.exports = router;
