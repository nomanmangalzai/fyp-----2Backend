const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  reviewId: {
    type: Number,
  },
  productName: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
    //I want to take it from user schema/model
  },
  Rating: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = Reviews = mongoose.model("Review", reviewSchema);
