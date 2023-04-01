const express = require("express");
const res = require("express/lib/response");
const transaction = require("../models/transaction");

exports.postTransaction = async (req, res, next) => {
  console.log("THE POSTtRANSACTION API HAS BEEN HIT.");
  console.log(req.body);
  const { TransactionID, Status, OID, CustomerName, Date } = req.body;
  //   const check = await transaction.find({ transactionId: TransactionId });
  // 1  //   const check = await users.findOne({ email: Email });
  try {
    const newTransaction = new transaction({
      transactionId: TransactionID,
      status: Status,
      oid: OID,
      customerName: CustomerName,
      date: Date,
    });

    await newTransaction.save().then((result) => {
      res.status(201).json({
        message:
          "The transaction with id = " +
          TransactionID +
          " has been successfully completed.",
      });
    });
  } catch (error) {
    console.log("ERROR = " + error.message);
    return res
      .status(403)
      .json({ message: "A transaction with this key already exists" });
  }
};

exports.viewTransaction = async (req, res, next) => {
  console.log("VIEW TRANSACTIONS API HAS BEEN HIT.  ");
  try {
    const transactions = await transaction.find({}, { _id: 0, __v: 0 });
    res.send(transactions);
  } catch (error) {
    console.log(error.message);
  }
};
