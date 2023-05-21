const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: { type: String },
  phoneNo: {
    type: String,
    unique: true,
    required: ["Please provide a phone number"],
  },
  town: {
    type: String,
    required: [true, "please enter your town name"],
  },
  streetNo: {
    type: Number,
    required: [true, "please enter your town street number"],
  },
  houseNo: {
    type: String,
    required: [true, "please enter your house number"],
  },
  age: {
    type: Number,
  },
  image: {
    type: String,
  },
  // password: String,
});

// Before saving the user, hash the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
