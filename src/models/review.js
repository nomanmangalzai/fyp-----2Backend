const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  productId: {
    type: String,
    required: [true, "Please enter the product id"],
  },
  productName: {
    type: String,
    required: [true, "Please enter the name of the product"],
  },
  rating: {
    type: Number, //number
    required: [true, "Please enter the review rating"],
  },
  customerName: {
    type: String,
    required: [true, "Please enter the name of the reviewer"],
    //I want to take it from user schema/model
  },
  phoneNumber: {
    type: String,
  },
  reviewMessage: {
    type: String,
    required: [true, "Please enter the review description"],
  },
});
module.exports = Reviews = mongoose.model("Review", reviewSchema);
