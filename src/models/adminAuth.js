const mongoose = require("mongoose");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
