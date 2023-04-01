const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/DawoodzaiMallDb",
  (err, success) => {
    if (err) {
      console.log("connection failed");
    }
    if (success) {
      console.log("connection successful");
    }
  }
);
