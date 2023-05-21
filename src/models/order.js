const mongoose = require("mongoose");

const orderShema = mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
    required: true,
  },
  productName: {
    type: String,
    require: [true, "product name is required"],
  },
  productId: {
    type: String,
    require: [true, "product id is required"],
  },
  productQuantity: {
    type: Number,
    require: [true, "product name is required"],
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
  customerAddress: {
    type: String,
    // require: [true, "product name is required"],
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    //when user places order
    type: Date,
    default: Date.now,
    // required: true,
  },
  additionalComments: {
    type: String,
  },
  shippingMethod: {
    type: String,
    // required: true,
  },
  deliveryDate: {
    // when will the order be delivered
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
  },
});
module.exports = orderModel = mongoose.model("customersOrders", orderShema);
