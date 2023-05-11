const users = require("../models/auth");

const isAuthorized = (req, res, next) => {
  const acceptedEmai1 = "noman.mangalzai4@gmail.com";
  const acceptedEmai2 = "alianwar@gmail.com";

  users.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem.");
    if (!user)
      return res
        .status(404)
        .send("You must have an account to make this request.");
    if (user.email !== acceptedEmail1 || user.email !== acceptedEmai2)
      return res.status(401).send("You are not authorized.");
    req.email = user.email;
    next();
  });
};

module.exports = isAuthorized;

// const isAdmin = (req, res, next) => {
//     const { email } =
// };
