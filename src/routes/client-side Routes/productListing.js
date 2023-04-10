const express = require("express");
const productListingController = require("../../controller/client_side APIs/productListing");
const router = express.Router();
const verifyToken = require("../../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../../controller/isAuthorized");
const isAdmin = require("../../controller/isAdmin");

// router.post("/showProducts", productListingController.showProducts);
router.get("/showproducts", productListingController.showProducts);
router.get("/shopbycategories", productListingController.shopByCategories);
router.post("/addtocart", productListingController.addToCart);

module.exports = router;
