const mongoose = require("mongoose");

// const reviewSchema = mongoose.Schema({
const transactionSchema = mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  oid: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String, // save phone number with strings to allow + and -.
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = transaction = mongoose.model("Transaction", transactionSchema);
