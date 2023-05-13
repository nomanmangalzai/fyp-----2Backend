const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// app.use(cors());
//123 testing
app.use(cors({ origin: "http://localhost:3005" }));

require("./src/db/connection");
app.use(bodyParser.json());
app.use(express.json());

app.get(express.json());
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: false }));

//require("dotenv").config({ path: __dirname + "/.env" });

//Below are files of routes folder.
const autRoute = require("./src/routes/auth");
const productRoute = require("./src/routes/product");
const orderListRoute = require("./src/routes/order");
const customerList = require("./src/routes/customerList");
const reviewList = require("./src/routes/review");
const transactionList = require("./src/routes/transaction");

//Below are files of routes folder for client-side
const productListing = require("./src/routes/client-side Routes/productListing");
const shoppingCart = require("./src/routes/client-side Routes/shoppingCart");

//Below are middllewares.
app.use("/authUser", autRoute);
app.use("/productList", productRoute);
app.use("/orderList", orderListRoute);
app.use("/customerList", customerList);
app.use("/reviewList", reviewList);
app.use("/transactionList", transactionList);

//Below are middlewares for client-side
app.use("/client-product-listing", productListing);
app.use("/shopping-cart", shoppingCart);

const PORT = 3000;
app.listen(PORT, console.log(`Server Started on port ${PORT}`));
