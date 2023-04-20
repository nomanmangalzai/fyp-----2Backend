const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
// const secret = require("./config").secret; //contains secret key used to sign tokens
const secret = require("../config").secret; //contains secret key used to sign tokens

const res = require("express/lib/response");
const shoppingCart = require("../../models/client-side Schemas/shoppingCart");
const users = require("../../models/auth");
const mongoose = require("mongoose");
const { options } = require("../../routes/auth");

exports.addToCart = async (req, res, next) => {
  console.log("Shopping Cart API Called");
  // const { productName, productPrice, productQuantity, cartTotal, id } =
  //   req.body;
  // // console.log(id);
  // // const userSchema = new mongoose.Schema({
  // //   name: String,
  // //   email: String,
  // //   id: String,
  // // });
  // // const User = new users({
  // //   name: "Noman",
  // //   email: "noman.mangalzai@gmail.com1",
  // //   id: "123",
  // // });

  // // // const user = await users.findById(id);
  // // // console.log(user);
  // // const post = await shoppingCart.findById(id).populate("customerName");

  // // console.log(post.customerName.email);
  // const userCart = new shoppingCart({
  //   productName: productName,
  //   productPrice: productPrice,
  //   productQuantity: productQuantity,
  //   cartTotal: cartTotal,
  // });

  // await userCart.save().then((userCart) => {
  //   res.status(201).json({
  //     message: "The cart has been successfully saved.",
  //   });
  // });
  // // 642e4a4b8259b8bccf466a7e
  // const customerName = await users.findById("642e4a4b8259b8bccf466a7e");
  // console.log(customerName.email);

  // if (post) {
  //   console.log("populated");
  // }
  // console.log(post.customerName.email);
};
