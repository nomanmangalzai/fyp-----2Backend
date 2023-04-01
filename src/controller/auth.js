const express = require("express");
const res = require("express/lib/response");
const users = require("../models/auth");

exports.signUp = async (req, res, next) => {
  console.log("The signup API has been called in mvc learning");
  const Email = req.body.email; //This "Email" spelling has to be different than of the schema when comparing the two values in find queries
  const Password = req.body.password;
  const ConfirmPassword = req.body.confirmPassword;
  const CustomerId = req.body.customerId;

  const check = await users.findOne({ email: Email });

  if (check) {
    return res
      .status(403)
      .json({ message: "User with this email already exists." });
  }
  const passwordLength = Password.length;
  if (passwordLength < 6) {
    res.status(201).json({
      message: "Password length must be equal to or greater than 6/ ",
    });
  }

  if (Password != ConfirmPassword) {
    return res
      .status(201)
      .json({ message: "Password and confirm password does not match." });
  }
  const user = new users({
    email: Email,
    password: Password,
    customerId: CustomerId,
  });

  await user.save().then((result) => {
    res.status(201).json({
      message: "Congratualtions! You have been successfully registered.",
      //User: result,
    });
  });
};
//exports.signUp = async (req, res, next) => {

exports.login = async (req, res, next) => {
  console.log("Congrats! The login API has been called.");

  //write API destructed variables with first letter capital
  const Email = req.body.email;
  const Password = req.body.password;
  const checkEmail = await users.findOne({ email: Email });
  const checkPassword = await users.findOne({ password: Password });
  if (!checkEmail) {
    return res.status(403).json({
      message: "Couldn't find your Nakamura Account.",
    });
  }
  if (!checkPassword) {
    return res.status(403).json({
      message:
        "Incorrect password. Try again or click Forgot password to reset it.",
    });
  }
  if (checkEmail && checkPassword) {
    console.log("Nakamura user with correct email.");
    res.status(201).json({ message: "Congratualtions! You have logged in" });
  }
};

exports.changePassword = async (req, res, next) => {
  console.log("The changePassword API has been hit.");
  try {
    const { userId } = req.params;
    const password = req.body.password;
    const userPassword = await users.findByIdAndUpdate(
      { _id: userId },
      { password: password },
      { new: true }
    );
    return res.status(200).json({ status: true, data: userPassword });
  } catch (error) {
    return res.status(400).json({ status: false, error: "Error occured" });
  }
};
