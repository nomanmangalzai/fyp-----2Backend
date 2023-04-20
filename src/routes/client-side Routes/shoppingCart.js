const express = require("express");
// const productListingController = require("../../controller/client_side APIs/productListing");
const shoppingCartController = require("../../controller/client_side APIs/shoppingCart");
const router = express.Router();
const verifyToken = require("../../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../../controller/isAuthorized");
const isAdmin = require("../../controller/isAdmin");

// router.post("/test-add-to-cart", shoppingCartController.addToCart);

module.exports = router;
