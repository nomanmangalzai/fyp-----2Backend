const mongoose = require("mongoose");
const DB =
  "mongodb+srv://nomanmangalzai4:noman123@cluster0.pye8sfv.mongodb.net/DawoodzaiMallDb?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful 3");
  })
  .catch((err) => console.log("no connection"));

// mongoose.connect(
//   "mongodb://localhost:27017/DawoodzaiMallDb",
//   (err, success) => {
//     if (err) {
//       console.log("connection failed");
//     }
//     if (success) {
//       console.log("connection successful to Local Mongodb");
//     }
//   }
// );
