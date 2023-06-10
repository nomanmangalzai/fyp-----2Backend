const express = require("express");
const res = require("express/lib/response");
const order = require("../models/order");
const orderSchema = require("../models/order");
const ordersReportSchema = require("../models/ordersReport");

exports.getOrdersReport = async (req, res, next) => {
  console.log("The getOrdersReport API has been called");
};
