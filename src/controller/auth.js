// controllers/authController.js
const User = require("../models/auth");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const secret = require("./config").secret; //contains secret key used to sign tokens
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
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      secret,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName);
  console.log("signup api has been hit");

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "Email already registered." });
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

module.exports = {
  signup,
  login
};
