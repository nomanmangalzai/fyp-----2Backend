// // index.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');

// // const app = express();

// app.use(cors({ origin: 'http://localhost:3010' }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Connected successfully to MongoDB");
// });

// app.use('/authUser', authRoutes);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server running on port ${port}`));


// // routes/authRoutes.js
// const express = require('express');
// const authController = require('../controllers/authController');

// // const router = express.Router();

// router.post('/signup', authController.signup);

// module.exports = router;


// // controllers/authController.js
// const User = require('../models/userModel');

// const signup = async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: 'Email already registered.' });
//   }

//   const newUser = new User({ firstName, lastName, email, password });

//   newUser.save((err, user) => {
//     if (err) return res.status(500).send(err);
//     res.status(201).json({ message: 'User created successfully.' });
//   });
// };

// module.exports = {
//   signup,
// };

// // models/userModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: String,
//   password: String,
// });

// // Before saving the user, hash the password
// userSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// module.exports = mongoose.model('User', userSchema);

// // sign in
// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');
// const User = require('./models/User'); // Assuming you have a User model

// const router = express.Router();
// const app = express();

// app.use(express.json());

// router.post(
//   '/login',
//   [             
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res.status(400).json({ message: 'Invalid Credentials' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid Credentials' });
//       }

//       const payload = {
//         user: {
//           id: user.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         { expiresIn: '5 days' },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// app.use('/authUser', router);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// // Model (User.js)
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// module.exports = mongoose.model('User', UserSchema);


// // Controller (authController.js)
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { validationResult } = require('express-validator');
// const User = require('../models/User'); 

// exports.login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid Credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid Credentials' });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '5 days' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // Router (authRoutes.js)
// const express = require('express');
// const { check } = require('express-validator');
// const authController = require('../controllers/authController');

// const router = express.Router();

// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   authController.login
// );

// module.exports = router;

// // Server (server.js)
// const express = require('express');
// const authRoutes = require('./routes/authRoutes');

// const app = express();

// app.use(express.json());
// app.use('/authUser', authRoutes);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));