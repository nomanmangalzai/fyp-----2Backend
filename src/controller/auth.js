// controllers/authController.js
const User = require('../models/auth');

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName)
  console.log("signup api has been hit")

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'Email already registered.' });
  }

  const newUser = new User({ 
    firstName:firstName, lastName:lastName, email:email, password:password 
  });

  newUser.save((err, user) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ message: 'User registered successfully.' });
  });
};

module.exports = {
  signup,
};