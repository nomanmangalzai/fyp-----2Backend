const mongoose = require("mongoose");

const SalesReportSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  productsPurchased: [
    {
      sku: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
});

const SalesReport = mongoose.model("SalesReport", SalesReportSchema);

module.exports = SalesReport;
