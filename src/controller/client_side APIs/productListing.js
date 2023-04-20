const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
// const secret = require("./config").secret; //contains secret key used to sign tokens
const secret = require("../config").secret; //contains secret key used to sign tokens

const res = require("express/lib/response");
const ImageModel = require("../../models/product");
const shoppingCart = require("../../models/client-side Schemas/shoppingCart");
const product = require("../../models/product");

// 400 = the server cannot or will not process the request due to something that is perceived to be a client error

exports.showProducts = async (req, res, next) => {
  console.log("The show products API has been called");
  try {
    const results = await ImageModel.find(
      {}
      // { productTitle: 1, SKU: 1, category: 1, price: 1, status: 1 }
    );
    // res.send(results);
    return res.status(201).json({
      NoOfProdcuts: results.length,
      message: "Products retrieved from ImageModel",
      storedItems: results,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.shopByCategories = async (req, res, next) => {
  console.log("The shopByCategories API has been hit");
  try {
    const searchedForItem = req.query;
    console.log(searchedForItem);
    const searchedForProducts = await ImageModel.find(req.query, {
      __v: 0,
      _id: 0,
    });
    res.status(200).json({
      status: "success",
      NoOfProductsFiltered: searchedForProducts.length,
      data: {
        searchedForProducts,
      },
    });
  } catch (error) {
    console.log("Could not filter the products due to" + error);
    res
      .status(404)
      .json({ status: "failed", message: "Could not filter products" });
  }
};

exports.addToCart = async (req, res, next) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const {
    productName,
    productPrice,
    productQuantity,
    cartTotal,
    additionalComments,
    deliveryDateAndTime,
  } = req.body;
  if (await shoppingCart.findOne({ productName: productName })) {
    return res.status(400).send("This product is already added");
  }
  console.log("Shopping Cart API Called");

  try {
    const userCart = new shoppingCart({
      productName: productName,
      productPrice: productPrice,
      productQuantity: productQuantity,
      cartTotal: cartTotal,
      additionalComments: additionalComments,
      deliveryDateAndTime: deliveryDateAndTime,
    });
    // await user.save().then((user) => {
    await userCart.save().then((userCart) => {
      res
        .status(201)
        .json({ message: "Product added to cart", userCart: userCart });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json("Error occured while adding to cart");
  }
};

exports.updateQuantity = async (req, res, next) => {
  console.log("Update quantity API's been called");
  const { id, productQuantity } = req.body;
  console.log();
  try {
    if (id !== "null") {
      const updatedShoppingCartProduct = await shoppingCart.findByIdAndUpdate(
        id,
        { productQuantity: productQuantity }
      );

      return res.status(200).json({
        message: "Quantity updated",
        status: true,
        // data: userPassword,
      });

      // updatedShoppingCartProduct.save().then((updatedShoppingCartProduct) => {
      //   return res.status(200).json({
      //     message: "Product quantity updated",
      //     updateProduct: updatedShoppingCartProduct,
      //   });
      // });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "could not update the product's quantity" });
  }
};
