const express = require("express");
const res = require("express/lib/response");
const order = require("../models/order");
const orderSchema = require("../models/order");
const ImageModel = require("../models/product");

exports.postOrder = async (req, res, next) => {
  console.log("Congrats! The postOrder API has been hit.");
  const {
    orderId,
    productName,
    productId,
    productQuantity,
    customerName,
    phoneNo,
    totalPrice,
    status,
    date,
    shippingMethod,
  } = req.body;
  console.log(orderId);
  console.log(status);
  const product = ImageModel.findOne({ _id: productId });
  //stock-quantity
  if (productQuantity <= 0) {
    return res.send("please enter a positive number for quantity");
  }
  product.stock - productQuantity;
  if (product.stock < 0) {
    return res.send(
      "Not enough products available. Decrease the quantity or contact the administration"
    );
  }
  // const stockMinusQuantity = await
  const checkForDuplicay = await orderSchema.findOne({
    orderId: orderId,
  });
  if (checkForDuplicay) {
    return res.status(403).json({ message: "Please Enter a unique orderId" });
  }
  const order = new orderSchema({
    orderId: orderId,
    productName: productName,
    productId: productId,
    productQuantity: productQuantity,
    customerName: customerName,
    phoneNo: phoneNo,
    totalPrice: totalPrice,
    status: status,
    date: date,
    shippingMethod: shippingMethod,
  });

  //save the record ="order" in database
  await order.save().then((result) => {
    res.status(201).json({
      message: "Your order has been successfully stored.",
      //User: result,
    });
  });
};

exports.deleteOrder = async (req, res, next) => {
  console.log("Congratulation! The delete order API has been called");
  const orderId = req.params.id;
  // const OID = orderId
  console.log("orderid = " + orderId);
  orderSchema.findOneAndDelete({ orderId: orderId }, function (error, docs) {
    if (error) {
      res.send("Error occured.");
    } else {
      if (docs === null) {
        res.send("Wrong ID! No product with this id in the database");
      } else {
        res.send("The order with id = " + orderId + " has been deleted.");
        console.log("data = " + docs);
      }
    }
  });
};

exports.viewOrders = async (req, res, next) => {
  console.log("Congratulatios my brother! The  view orders API has been hit.");
  try {
    const results = await orderSchema.find(
      {},
      {
        orderId: 1,
        customerName: 1,
        phoneNo: 1,
        totalPrice: 1,
        status: 1,
        date: 1,
      }
    );
    res.send(results);
  } catch (error) {
    console.log(
      "An error occured while we were displaying the orders: which is:= " +
        error.message
    );
  }
};

//single order api is below
exports.viewSingleOrder = async (req, res, next) => {
  console.log("viewSingleOrder API called");
  const id = req.params.id;
  console.log(id);
  try {
    const singleOrder = await orderSchema.findOne({ _id: id });
    res.send(singleOrder);
  } catch (error) {
    res.send("wrong order id entered");
  }
};

exports.searchOrders = async (req, res, next) => {
  console.log("The filter products API has been called.");
  // const { totalPrice } = req.query.totalPrice;
  // console.log(totalPrice);
  // const queryObject = {};

  // console.log(queryObject);
  // const totalPricee = req.params.key;
  console.log(req.query);

  const myData = await orderSchema.find(req.query, { __v: 0 });
  res.status(200).json({
    status: "success",
    NoOfresults: myData.length,
    data: {
      myData,
    },
  });
};
