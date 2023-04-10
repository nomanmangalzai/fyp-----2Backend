const users = require("../models/auth");

const isAdmin = (req, res, next) => {
  const acceptedEmail = "noman.mangalzai4@gmail.com";

  users.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem.");

    if (!user)
      return res
        .status(404)
        .send("You must have an account to make this request.");
    if (user.email !== acceptedEmail)
      return res.status(401).send("You are not Authorizes.");
    //check sub-branch
    req.email = user.email;
    next();
  });
};

module.exports = isAdmin;
