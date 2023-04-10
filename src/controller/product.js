const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const res = require("express/lib/response");
const mongoose = require("mongoose");
const multer = require("multer");
const ImageModel = require("../models/product");

// const product = require("../models/product");

exports.postProduct = async (req, res, next) => {
  console.log("The uploadProduct API has been called.");
  mongoose.Schema.Types.Boolean.convertToTrue.add("Active");
  mongoose.Schema.Types.Boolean.convertToFalse.add("Deactive");
  console.log("Let's check github desktop");

  //Storage
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  //upload
  const upload = multer({
    storage: Storage,
  }).single("testImage");

  upload(req, res, async (err) => {
    if (await ImageModel.findOne({ SKU: req.body.SKU })) {
      return res.send("The sku should be a unique value");
    }

    if (err) {
      console.log(err);
    } else {
      const checkProduct = await ImageModel.findOne({
        productTitle: req.body.productTitle,
      });
      if (checkProduct) {
        //await ImageModel.deleteMany({ productTitle: "coke" }); //this code is for deleteing
        // records of database
        return res.status(403).json({
          message: "Product with the same name already exists.",
        });
      } else {
        console.log(req.body.status);
        const newImage = new ImageModel({
          productTitle: req.body.productTitle,
          SKU: req.body.SKU,
          color: req.body.color,
          price: req.body.price,
          status: req.body.status,
          tag: req.body.tag,
          description: req.body.description,
          quantity: req.body.quantity,
          date: req.body.date,
          category: req.body.category,
          subcategory: req.body.subcategory,
          // image: req.body.testImage,
          image: {
            data: req.file.filename,
            contentType: "image/png",
          },
        });
        newImage
          .save()
          .then((product) =>
            res.send(
              "The product description has been successfully uploaded.." +
                product
            )
          )
          .catch((err) => {
            console.log(err);
            {
              return res.send("Error while uploading the product" + err);
            }
          });
      }
    }
  });
};
exports.viewProducts = async (req, res, next) => {
  console.log("The view products API has been hit");
  try {
    const results = await ImageModel.find(
      {}
      // { productTitle: 1, SKU: 1, category: 1, price: 1, status: 1 }
    );
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log("UpdateProduct API has been hit.");
  // mongoose.Schema.Types.Boolean.convertToFalse.add("Deactive");
  // mongoose.Schema.Types.Boolean.convertToTrue.add("Active");

  // console.log(req.body.productTitle);

  // res.send({ result: "update" });

  //write update api code from United Top Tech
  // let updatedId = req.params.id;
  let deleteId = req.params.id;

  console.log("deleteId = " + deleteId);
  //Storage;
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  //wait

  //upload
  const upload = multer({
    storage: Storage,
  }).single("testImage");

  upload(req, res, async (err) => {
    // console.log(req.body);
    if (err) {
      console.log(err);
    } else {
      console.log(req.body.productTitle);

      ImageModel.findOneAndUpdate(
        { SKU: deleteId },
        {
          // $set: req.body,
          $set: {
            productTitle: req.body.productTitle,
            color: req.body.color,
            // SKU: req.body.SKU,
            price: req.body.price,
            status: req.body.status,
            tag: req.body.status,
            description: req.body.description,
            quantity: req.body.quantity,
            date: req.body.date,
            category: req.body.category,
            subcategory: req.body.subcategory,
            image: {
              data: req.file.filename,
              contentType: "image/png",
            },
            // image: req.body.testImage,
            // image: {
            //   data: req.file.filename,
            //   contentType: "image/png",
            // },
            // image: {
            //   data: req.file.filename,
            //   contentType: "image/png",
            // },
            // testImage: req.file.finename,
          },
        },
        { new: true },
        (err, data) => {
          if (data === null) {
            res.send("No data found");
          } else {
            res.send("Congratulation: Data updated. updatedProduct = " + data);
          }
        }
      );
    }
  });
};

exports.deleteProduct = async (req, res, next) => {
  console.log("The delete product API has been hit.");
  let deleteId = req.params.id;

  try {
    ImageModel.findOneAndDelete({ SKU: deleteId }, function (err, docs) {
      if (err) {
        res.send("Error! You have entered wrong key type.");
      } else {
        if (docs === null) {
          res.send("Wrong ID");
        } else {
          res.send(
            "The requested record with SKU = " + deleteId + " has been deleted"
          );
        }
      }
    });
  } catch (error) {
    console.log("Could not delete the product." + error);
  }
};

exports.searchProducts = async (req, res, next) => {
  console.log("The searchProducts API has been called.");
  const searchedForItem = req.query;
  console.log(searchedForItem);
  const searchedForProduct = await ImageModel.find(req.query);
  res.status(200).json({
    status: "success",
    NoOfresults: searchedForProduct.length,
    data: {
      searchedForProduct,
    },
  });
};

exports.filterProducts = async (req, res, next) => {
  console.log("filterProducts API has been hit.");
  const searchedForItem = req.query;
  console.log(searchedForItem);
  const searchedForProduct = await ImageModel.find(req.query, {
    __v: 0,
    _id: 0,
  });
  res.status(200).json({
    status: "success",
    NoOfresultsFiltered: searchedForProduct.length,
    data: {
      searchedForProduct,
    },
  });
};
