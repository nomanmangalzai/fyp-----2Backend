// controllers/authController.js
const User = require("../models/auth");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const secret = require("./config").secret; //contains secret key used to sign tokens
const emailValidator = require("node-email-validation");

const login = async (req, res) => {
  console.log("signin api has been hit");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    let userInfo = await User.find(
      { email: email },
      { __v: 0, password: 0, _id: 0 }
    );

    jwt.sign(payload, secret, { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        User: userInfo,
        message: "Congratulations! You have been successfully logged in",
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName);
  console.log("signup api has been hit");

  const userExists = await User.findOne({ email });
  const isEmailValid = emailValidator.is_email_valid(email);
  if (!isEmailValid) {
    return res
      .status(403)
      .json({ message: "Please provide a valid email address" });
  }

  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email is already registered." });
  }

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  newUser.save((err, user) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: "User registered successfully." });
  });
};

const adminAccountManagement = async (req, res, next) => {
  console.log("admin account management api called");
  //  let deleteId = req.params.id;

  const userId = req.params.id;

  console.log(userId);
  try {
    const { firstName, lastName, email, phoneNo, age } = req.body;
    // if (firstName === "null") {
    //   firstName = User.firstName;
    // }
    // console.log();
    // if (lastName === "null") {
    //   lastName = await User.findOne();
    // }
    // console.log(lastName);
    // if (email === "null") {
    //   email = User.email;
    // }
    // if (phoneNo === "null") {
    //   phoneNo = User.phoneNo;
    // }
    // if (age === "null") {
    //   age = User.age;
    // }
    const userUpdateInformation = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phoneNo,
        age: age,
      },
      { new: true }
    );
    const fetchUpdateInformation = await User.findOne(
      { _id: userId },
      { __v: 0, password: 0, _id: 0 }
    );
    //  let userInfo = await User.find(
    //   { email: email },
    //   { __v: 0, password: 0, _id: 0 }
    // );
    //send response
    return res.status(200).json({
      message: "Your information has been successfully updated",
      status: true,
      data: fetchUpdateInformation,
    });
  } catch (error) {}

  //sample
  // const userPassword = await users.findOneAndUpdate(
  //   { email: Email },
  //   { password: newPassword },
  //   { new: true }
  // );
};
module.exports = {
  signup,
  login,
  adminAccountManagement,
};
