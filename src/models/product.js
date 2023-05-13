const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  productTitle: {
    type: String,
    unique: true,
    required: [true, "product Title should be written"],
  },
  sku: {
    type: Number,

    // required: [true, "Please Include the product sku"],
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: [true, "Please include the product size"],
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: [true, "Please Include the product image URL"],
  },
});

module.exports = ImageModel = mongoose.model("imageModel", ImageSchema);
