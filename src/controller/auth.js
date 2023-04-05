const express = require("express");
const app = express();
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const users = require("../models/auth");
const secretKey = "secretKey";
const verifyToken = require("./verifyToken");

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

  const Email = req.body.Email;
  console.log(Email);
  const Password = req.body.Password;

  const checkEmail = await users.findOne({ email: Email });
  const checkPassword = await users.findOne({ password: Password });

  if (checkEmail && checkPassword) {
    const user = await users.findOne({ email: Email });
    console.log(user);
    jwt.sign({ user }, secretKey, { expiresIn: "2d" }, (error, token) => {
      res.json({
        token,
        message: "You have logged in.",
      });
    });
    // console.log("Nakamura user with correct email.");
    // res.status(201).json({ message: "Congratualtions! You have logged in" });
  }
};

exports.profile = async (req, res, next) => {
  console.log("profile API called");
  jwt.verify(req.token, secretKey, (error, authData) => {
    if (error) {
      res.send({ json: "invalid token", error });
    } else {
      res.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
};

exports.changePassword = async (req, res, next) => {
  console.log("The changePassword API has been hit.");
  try {
    const { Email, oldPassword, newPassword } = req.body;
    const user = await users.findOne({ email: Email });
    if (!user) {
      return res.status(400).send("user with given email doesn't exist");
    }
    const databasePassword = await users.findOne({ password: oldPassword });
    if (!databasePassword) {
      return res.status(400).send("old password does not match");
    }
    const updatePassowrd = await users.findOneAndUpdate(
      { email: Email },
      { password: newPassword }
    );
    if (updatePassowrd) {
      return res.status(200).send("The password has been updated");
    }

    // const userPassword = await users.findByIdAndUpdate(
    //   { _id: userId },
    //   { password: password },
    //   { new: true }
    // );
    // return res.status(200).json({ status: true, data: userPassword });
  } catch (error) {
    return res.status(400).json({ status: false, error: "Error occured" });
  }
};

// exports.changePassword = async (req, res, next) => {
//   console.log("The changePassword API has been hit.");
//   try {
//     const { customerID, oldPassword, newPassword } = req.body;
//     console.log(customerID);

//     // const oldPasswordFromDatabase = await users.findById({
//     //   customerId: customerID,
//     // });
//     const userPassword = await users.findByIdAndUpdate(
//       { _id: customerID },
//       { password: newPassword },
//       { new: true }
//     );
//     return res.status(200).json({ status: true, data: userPassword });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ status: false, error: "Error occured" });
//   }
// };
