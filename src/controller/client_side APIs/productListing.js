const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
// const secret = require("./config").secret; //contains secret key used to sign tokens
const secret = require("../config").secret; //contains secret key used to sign tokens

const res = require("express/lib/response");
const ImageModel = require("../../models/product");

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
