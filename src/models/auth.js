const mongoose = require("mongoose");
//making a schema/top-row
const users = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
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
  phoneNo: {
    type: String,
  },
  Address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: "false",
  },
});

//table // collection
const userModel = mongoose.model("user", users);
module.exports = userModel;
