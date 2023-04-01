const mongoose = require("mongoose");
//making a schema/top-row
const users = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  customerId: {
    type: Number,
  },
});

//table // collection
const userModel = mongoose.model("user", users);
module.exports = userModel;
