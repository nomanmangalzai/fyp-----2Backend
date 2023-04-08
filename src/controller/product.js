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
        console.log(titleOfProduct);
        const newImage = new ImageModel({
          productTitle: req.body.productTitle,
          SKU: req.body.SKU,
          color: req.body.color,
          // size: req.body.size,
          price: req.body.price,
          status: req.body.status,
          tag: req.body.tag,
          description: req.body.description,
          quantity: req.body.quantity,
          category: req.body.category,
          subcategory: req.body.subcategory,
          image: {
            data: req.file.filename,
            contentType: "image/png",
          },
        });
        newImage
          .save()
          .then(() =>
            res.send("The product description has been successfully uploaded..")
          )
          .catch((err) => {
            console.log(err);
            {
              return res.send("Error while uploading product" + err);
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

  // res.send({ result: "update" });

  //write update api code from United Top Tech
  let updatedId = req.params.id;
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

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      ImageModel.findOneAndUpdate(
        { SKU: updatedId },
        {
          $set: {
            productTitle: req.body.productTitle,
            SKU: updatedId,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            status: req.body.status,
            tag: req.body.status,
            description: req.body.description,
            category: req.body.category,
            subcategory: req.body.subcategory,
            image: {
              data: req.file.filename,
              contentType: "image/png",
            },
          },
        },
        { new: true },
        (err, data) => {
          if (data === null) {
            res.send("No data found");
          } else {
            res.send("Congratulation: Data updated");
          }
        }
      );
    }
  });
};

exports.deleteProduct = async (req, res, next) => {
  console.log("The delete product API has been hit.");
  let deleteId = req.params.id;
  ImageModel.findOneAndDelete({ SKU: deleteId }, function (err, docs) {
    if (err) {
      res.send("Error! You have entered wrong key.");
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
