const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Please enter the name of the reviewer"],
    //I want to take it from user schema/model
  },
  email: {
    type: String,
    required: [true, "Please enter the email of the reviewer"],
  },
  Rating: {
    type: Number, //number
    required: [true, "Please enter the review rating"],
  },
  title: {
    type: String,
    required: [true, "Please enter the review title"],
  },
  message: {
    type: String,
    required: [true, "Please enter the review description"],
  },
  Date: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter the date of the review"],
  },
});
module.exports = Reviews = mongoose.model("Review", reviewSchema);
