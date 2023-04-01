const mongoose = require("mongoose");

const orderShema = mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    //type: mongoose.Schema.Types.ObjectId,
    //ref: "orderItem"
  },
  phoneNo: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = orderModel = mongoose.model("customersOrders", orderShema);
