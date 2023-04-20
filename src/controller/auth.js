const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secret = require("./config").secret; //contains secret key used to sign tokens
const res = require("express/lib/response");
const users = require("../models/auth");
var validator = require("node-email-validation");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  console.log("The signup API has been called in mvc learning");
  // const Email = req.body.email; //This "Email" spelling has to be different than of the schema when comparing the two values in find queries
  const { firstName, lastName, email, password, ConfirmPassword, isAdmin } =
    req.body;
  const isEmailValid = validator.is_email_valid(email);
  if (!isEmailValid) {
    return res
      .status(403)
      .json({ message: "Please provide a valid email address" });
  }
  const check = await users.findOne({ email: email });

  if (check) {
    return res
      .status(403)
      .json({ message: "User with this email already exists." });
  }
  const passwordLength = password.length;
  if (passwordLength < 6) {
    return res.status(201).json({
      message: "Password length must be equal to or greater than 6/ ",
    });
  }

  if (password !== ConfirmPassword) {
    return res
      .status(201)
      .json({ message: "Password and confirm password does not match." });
  }

  //hash the password
  const hash = await bcrypt.hash(password, 10);

  const user = new users({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hash,
    isAdmin: isAdmin,
  });

  // await user.save().then((user) => {
  await user.save().then((user) => {
    res
      .status(201)
      .json({ message: "You have been successfully registered", User: user });
  });
};
//exports.signUp = async (req, res, next) => {

exports.login = async (req, res, next) => {
  console.log("Congrats! The login API has been called.");

  const Email = req.body.Email;
  const Password = req.body.Password;

  const checkEmail = await users.findOne({ email: Email });
  const checkPassword = await users.findOne({ password: Password });

  if (checkEmail && checkPassword) {
    const user = await users.findOne({ email: Email });
    users.findOne({ email: Email }, function (err, user) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("Invalid Credentials");

      const passwordIsValid = checkPassword;
      if (!passwordIsValid)
        return res
          .status(401)
          .send({ auth: false, token: null, msg: "Invalid Credentials" });

      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      //We can send email and other information in token as well.
      // const token = jwt.sign({ id: user._id, email: email}, secret, {
      //   expiresIn: 86400, // expires in 24 hours
      // });

      res.status(200).send({
        auth: true,
        token: token,
        message: "You have successfully logged in",
      });
    });
    // console.log("Nakamura user with correct email.");
    // res.status(201).json({ message: "No token found for the user" });
  }
};

exports.changePassword = async (req, res, next) => {
  console.log("The changePassword API has been hit.");
  try {
    const { Email, oldPassword, newPassword } = req.body;

    // const oldPasswordFromDatabase = await users.findById({
    //   customerId: customerID,
    // });
    if (oldPassword === newPassword) {
      return res.status(400).json({
        status: false,
        error: "Enter a new password you did not use before",
      });
    }
    const userPassword = await users.findOneAndUpdate(
      { email: Email },
      { password: newPassword },
      { new: true }
    );
    return res.status(200).json({ status: true, data: userPassword });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, error: "Error occured" });
  }
};
