const mongoose = require("mongoose");
//making a schema/top-row
// const users = mongoose.Schema({
const product = require("../product");
const users = require("../auth");

const shoppingCart = mongoose.Schema({
  //productName is a property of the shoppingCart schema
  productName: {
    type: String,
    unique: [true, "Enter unique productName"],
    required: [true, "Please enter the product name"],
  },
  customerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter the product price"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Please enter the product quantity"],
  },
  // productPicture: {
  //   data: Buffer,
  //   contentType: String,
  // },
  cartTotal: {
    type: Number,
    required: [true, "Please enter the shopping cart total"],
  },
  additionalComments: {
    type: String,
  },
  // deliveryDateAndTime: {
  //   type: Date,
  //   default: Date.now,
  //   required: [true, "Please enter the product date and time"],
  // },
});

shoppingCart.set("strictPopulate", false);

const shoppingCartModel = mongoose.model("shoppingCart", shoppingCart);
module.exports = shoppingCartModel;

// //table // collection
// const userModel = mongoose.model("user", users);
// module.exports = userModel;
