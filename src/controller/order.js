const express = require("express");
const res = require("express/lib/response");
const order = require("../models/order");
const orderSchema = require("../models/order");
const ImageModel = require("../models/product");

exports.postOrder = async (req, res, next) => {
  console.log("Congrats! The postOrder API has been hit.");
  const {
    orderId,
    orderItems,
    customerName,
    phoneNo,
    totalPrice,
    status,
    date,
    additionalComments,
    shippingMethod,
  } = req.body;
  // console.log(orderId);
  console.log(status);
  console.log(orderItems[0].productId);
  let products = [];
  for (let i = 0; i < orderItems.length; i++) {
    console.log(orderItems[i].productId);

    products[i] = await ImageModel.findOne({ _id: orderItems[i].productId });
    // Do something with the product...
  }
  let productQuantity = [];
  for (let i = 0; i < orderItems.length; i++) {
    productQuantity[i] = orderItems[i].productQuantity;
    if (productQuantity <= 0) {
      return res.send("Please enter a positive number for quantity");
    }
  }
  console.log(productQuantity);
  //
  let productId = [];
  for (let i = 0; i < orderItems.length; i++) {
    productId[i] = orderItems[i].productId;
    console.log("Product ID:", productId);
  }
  // if (product.stock < 0) {
  //   return res.send(
  //     "Not enough products available. Decrease the quantity or contact the administration"
  //   );
  // }

  for (let i = 0; i < orderItems.length; i++) {
    console.log(orderItems[i].productId);
    products[i] = await ImageModel.findOne({ _id: orderItems[i].productId });
    if (products[i].stock < 0) {
      return res.send(
        "Not enough products available. Decrease the quantity or contact the administration"
      );
    }

    // products.push(product); // Add the product to the products array
  }
  // const stockMinusQuantity = await
  const checkForDuplicay = await orderSchema.findOne({
    orderId: orderId,
  });
  if (checkForDuplicay) {
    return res.status(403).json({ message: "Please Enter a unique orderId" });
  }
  //stock minus quantity
  const stock = [];
  for (let i = 0; i < orderItems.length; i++) {
    const productStock = await ImageModel.findOne({
      productName: orderItems[i].productName,
    });
    stock[i] = parseFloat(products[i].stock);
    console.log(stock[i]);
  }
  //temporary loop
  for (let i = 0; i < orderItems.length; i++) {
    console.log("products[i].stock)= " + products[i].stock);
  }

  for (let i = 0; i < orderItems.length; i++) {
    products[i].stock = stock[i] - productQuantity[i];
    await products[i].save();
  }
  //decrease quantity from product.stock
  // await product.save();
  for (let i = 0; i < orderItems.length; i++) {
    if (products[i].stock < 0) {
      console.log(i + "=" + orderItems[i].productQuantity);
      products[i].stock = products[i].stock + orderItems[i].productQuantity;
      await products[i].save();
      return res.send("Not enough products");
    }
  }

  const order = new orderSchema({
    orderId: orderId,
    orderItems: orderItems,
    customerName: customerName,
    phoneNo: phoneNo,
    totalPrice: totalPrice,
    status: status,
    date: date,
    additionalComments: additionalComments,
    shippingMethod: shippingMethod,
  });

  //save the record ="order" in database
  await order.save().then((result) => {
    res.status(201).json({
      orderDetails: order,
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
    const results = await orderSchema.find({});
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
    const singleOrder = await orderSchema.findOne({ orderId: id });
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
