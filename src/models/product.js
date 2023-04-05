const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  productTitle: {
    type: String,
    unique: true,
    required: true,
  },
  SKU: {
    type: Number,
    unique: true,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
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
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = ImageModel = mongoose.model("imageModel", ImageSchema);
