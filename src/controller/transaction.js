const express = require("express");
const res = require("express/lib/response");
const transaction = require("../models/transaction");

exports.postTransaction = async (req, res, next) => {
  console.log("THE POSTtRANSACTION API HAS BEEN HIT.");
  console.log(req.body);
  const { transactionID, status, oid, customerName, date } = req.body;
  //   const check = await transaction.find({ transactionId: TransactionId });
  // 1  //   const check = await users.findOne({ email: Email });
  try {
    const newTransaction = new transaction({
      transactionId: transactionID,
      status: status,
      oid: oid,
      customerName: customerName,
      date: date,
    });

    await newTransaction.save().then((result) => {
      res.status(201).json({
        message:
          "The transaction with id = " +
          transactionID +
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

exports.filterTransactions = async (req, res, next) => {
  console.log("FilterProducts API has been called");
  const searchedForTransaction = req.query;
  console.log(searchedForTransaction);
  const searchedForTransactions = await transaction.find(req.query, {
    __v: 0,
    _id: 0,
  });
  res.status(200).json({
    status: "success",
    NoOfresultsFiltered: searchedForTransactions.length,
    data: {
      searchedForTransactions,
    },
  });
};

exports.deleteTransaction = async (req, res, next) => {
  console.log("The DELETETRANSACTION API has been hit.");
  const deleteTransactionId = req.params.id;
  console.log(deleteTransactionId);
  transaction.findOneAndDelete(
    { transactionId: deleteTransactionId },
    function (err, docs) {
      if (err) {
        res.send("This " + err + "happened");
      } else {
        if (docs == null) {
          res.send("Wrong ID");
        } else {
          res.send(
            "The requested transaction with id = " +
              deleteTransactionId +
              " has been deleted"
          );
        }
      }
    }
  );
};

exports.searchTransactions = async (req, res, next) => {
  console.log("The searchTransactions API has been hit.");
  const searchForTransaction = req.query;
  console.log(searchForTransaction);
  const queriedTransactions = await transaction.find(req.query, {
    _id: 0,
    __v: 0,
  });
  // if (queriedTransactions === null) {
  res.status(200).json({
    status: "success",
    NoOfresults: queriedTransactions.length,
    data: {
      queriedTransactions,
    },
  });
  // }
};
// const searchedForItem = req.query;
// console.log(searchedForItem);
// const searchedForProduct = await ImageModel.find(req.query);
// res.status(200).json({
//   status: "success",
//   NoOfresults: searchedForProduct.length,
//   data: {
//     searchedForProduct,
//   },
// });
