const express = require("express");
const res = require("express/lib/response");
const order = require("../models/order");
const orderSchema = require("../models/order");

exports.postOrder = async (req, res, next) => {
  console.log("Congrats! The postOrder API has been hit.");
  const { orderid, customername, phoneno, totalprice, statuss, datee } =
    req.body;
  console.log(orderid);
  console.log(statuss);

  const checkForDuplicay = await orderSchema.findOne({
    orderId: orderid,
  });
  if (checkForDuplicay) {
    return res.status(403).json({ message: "Please Enter a unique orderId" });
  }
  const order = new orderSchema({
    orderId: orderid,
    customerName: customername,
    phoneNo: phoneno,
    totalPrice: totalprice,
    status: statuss,
    date: datee,
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
  const { orderid } = req.body;
  console.log("orderid = " + orderid);
  orderSchema.findOneAndDelete({ orderId: orderid }, function (error, docs) {
    if (error) {
      res.send("Error occured.");
    } else {
      if (docs === null) {
        res.send("Wrong ID! No product with this id in the database");
      } else {
        res.send("The order with id = " + orderid + " has been deleted.");
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

exports.searchOrders = async (req, res, next) => {
  console.log("The filter products API has been called.");
  // const { totalPrice } = req.query.totalPrice;
  // console.log(totalPrice);
  // const queryObject = {};

  // console.log(queryObject);
  const totalPricee = req.params.key;
  console.log(totalPricee);

  const myData = await orderSchema.find({ totalPrice: totalPricee });
  res.status(200).json({
    status: "success",
    results: myData.length,
    data: {
      myData,
    },
  });
};
