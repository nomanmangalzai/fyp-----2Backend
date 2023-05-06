const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter the name of the product"],
  },
  customerName: {
    type: String,
    required: [true, "Please enter the name of the reviewer"],
    //I want to take it from user schema/model
  },
  email: {
    type: String,
    required: [true, "Please enter the email of the reviewer"],
  },
  rating: {
    type: Number, //number
    required: [true, "Please enter the review rating"],
  },
  reviewTitle: {
    type: String,
    required: [true, "Please enter the review title"],
  },
  reviewMessage: {
    type: String,
    required: [true, "Please enter the review description"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter the date of the review"],
  },
});
module.exports = Reviews = mongoose.model("Review", reviewSchema);
