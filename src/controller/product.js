const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const res = require("express/lib/response");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ImageModel = require("../models/product");

//function to save product details with image as url
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("image");
//

exports.postItem = async (req, res, next) => {
  // await ImageModel.deleteMany();
  if (ImageModel.findOne({ productTitle: req.body.productTitle })) {
    return res.json("enter a unique productTitle");
  }
  console.log("postItem called");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const imagePath = req.file.path;
      const imageUrl = `http://localhost:3000/${imagePath}`;

      const newImage = new ImageModel({
        productTitle: req.body.productTitle,
        image: imageUrl,
      });

      newImage.save((err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
          res.status(200).json("product description successfully uploaded");
        }
      });
    }
  });

  //
};

// const product = require("../models/product");
mongoose.Schema.Types.Boolean.convertToTrue.add("Active");
mongoose.Schema.Types.Boolean.convertToFalse.add("Deactive");

exports.postProduct = async (req, res, next) => {
  console.log("The uploadProduct API has been called.");
  const {
    productTitle,
    sku,
    color,
    price,
    size,
    status,
    tag,
    description,
    quantity,
    date,
    category,
    subcategory,
    image,
  } = req.body;

  //below active is converted to true and
  //deactive is converted to false
  mongoose.Schema.Types.Boolean.convertToTrue.add("Active");
  mongoose.Schema.Types.Boolean.convertToFalse.add("Deactive");

  //below are checks
  const checkProduct = await ImageModel.findOne({
    productTitle: req.body.productTitle,
  });
  if (checkProduct) {
    //await ImageModel.deleteMany({ productTitle: "coke" }); //this code is for deleteing
    // records of database
    return res.status(403).json({
      message: "Product with the same name already exists.",
    });
  }
  if (await ImageModel.findOne({ sku: req.body.sku })) {
    return res
      .status(403)
      .json({ message: "The sku should be a unique value" });
  }
  if (req.body.price <= 0) {
    return res.status(403).json({ message: "The price should be positive" });
  }

  // console.log(price);
  try {
    const newProduct = new ImageModel({
      productTitle: productTitle,
      sku: sku,
      color: color,
      size: size,
      price: price,
      status: status,
      tag: tag,
      description: description,
      quantity: quantity,
      date: date,
      category: category,
      subcategory: subcategory,
      image: image,
    });

    await newProduct.save().then((newProduct) => {
      res.status(201).json({
        message: "The product description has been successfully uploaded..",
      });
    });
  } catch (error) {
    console.log("error = " + error);
    return res.status(403).json({ message: "Could not upload the product." });
  }

  // below is the uploading of picture using multer
  // //Storage
  // const Storage = multer.diskStorage({
  //   destination: "uploads",
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
  // });

  // //upload
  // const upload = multer({
  //   storage: Storage,
  // }).single("testImage");

  // upload(req, res, async (err) => {
  //   if (await ImageModel.findOne({ SKU: req.body.SKU })) {
  //     return res
  //       .status(403)
  //       .json({ message: "The sku should be a unique value" });
  //   }
  //   if (req.body.price <= 0) {
  //     return res.status(403).json({ message: "The price should be positive" });
  //   }
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const checkProduct = await ImageModel.findOne({
  //       productTitle: req.body.productTitle,
  //     });
  //     if (checkProduct) {
  //       //await ImageModel.deleteMany({ productTitle: "coke" }); //this code is for deleteing
  //       // records of database
  //       return res.status(403).json({
  //         message: "Product with the same name already exists.",
  //       });
  //     } else {
  //       console.log(req.body.status);
  //       const newImage = new ImageModel({
  //         productTitle: req.body.productTitle,
  //         SKU: req.body.SKU,
  //         color: req.body.color,
  //         price: req.body.price,
  //         status: req.body.status,
  //         tag: req.body.tag,
  //         description: req.body.description,
  //         quantity: req.body.quantity,
  //         date: req.body.date,
  //         category: req.body.category,
  //         subcategory: req.body.subcategory,
  //         // image: req.body.testImage,
  //         image: {
  //           data: req.file.filename,
  //           contentType: "image/png",
  //         },
  //       });
  //       newImage
  //         .save()
  //         .then((product) =>
  //           res.send(
  //             "The product description has been successfully uploaded.." +
  //               product
  //           )
  //         )
  //         .catch((err) => {
  //           console.log(err);
  //           {
  //             return res.send("Error while uploading the product" + err);
  //           }
  //         });
  //     }
  //   }
  // });
};
exports.viewProducts = async (req, res, next) => {
  console.log("The view products API has been hit");
  try {
    const results = await ImageModel.find({}, { __v: 0 });
    res.send(results);
  } catch (error) {
    console.log(error.message);
  }
};

exports.productDescription = async (req, res, next) => {
  console.log("product Descripioin API called");
  const deleteId = req.params.id;
  const productDescription = await ImageModel.findOne(
    { _id: deleteId },
    { __v: 0 }
  );
  try {
    ImageModel.findOne({ _id: deleteId }, function (err, docs) {
      if (err) {
        res.send("Error! You have entered wrong key type.");
      } else {
        if (docs === null) {
          res.send("No record with mentioned sku");
        } else {
          res.status(201).json({
            message: "product description fetched from database",
            productdescription: productDescription,
          });
        }
      }
    });
  } catch (error) {
    console.log("error = " + error);
  }
};

exports.updateProduct = async (req, res, next) => {
  //check nodem odules deletion
  console.log("UpdateProduct API has been hit.");
  // mongoose.Schema.Types.Boolean.convertToFalse.add("Deactive");
  // mongoose.Schema.Types.Boolean.convertToTrue.add("Active");

  // console.log(req.body.productTitle);

  // res.send({ result: "update" });

  //write update api code from United Top Tech
  // let updatedId = req.params.id;
  let deleteId = req.params.id;
  const sku = req.body.sku;
  //below are checks
  const checkProduct = await ImageModel.findOne({
    productTitle: req.body.productTitle,
  });
  if (checkProduct) {
    //await ImageModel.deleteMany({ productTitle: "coke" }); //this code is for deleteing
    // records of database
    return res.status(403).json({
      message: "Product with the same name already exists.",
    });
  }

  try {
    ImageModel.findOneAndUpdate(
      { sku: deleteId },
      {
        // $set: req.body,
        $set: {
          productTitle: req.body.productTitle,
          color: req.body.color,
          // sku: req.body.sku,
          size: req.body.size,
          price: req.body.price,
          status: req.body.status,
          tag: req.body.status,
          description: req.body.description,
          quantity: req.body.quantity,
          date: req.body.date,
          category: req.body.category,
          subcategory: req.body.subcategory,
          image: req.body.image,
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
          // res.send("Congratulation: Data updated. updatedProduct = " + data);
          return res.status(201).json({
            message: "Congratulation: Data updated. updatedProduct = " + data,
          });
        }
      }
    );
  } catch (error) {
    return res.status(201).json({
      message: "Could not update the product",
    });
  }

  //below is old code = updation with multer

  // console.log("deleteId = " + deleteId);
  // //Storage;
  // const Storage = multer.diskStorage({
  //   destination: "uploads",
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
  // });

  // //wait

  // //upload
  // const upload = multer({
  //   storage: Storage,
  // }).single("testImage");

  // upload(req, res, async (err) => {
  //   // console.log(req.body);
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(req.body.productTitle);

  //     ImageModel.findOneAndUpdate(
  //       { SKU: deleteId },
  //       {
  //         // $set: req.body,
  //         $set: {
  //           productTitle: req.body.productTitle,
  //           color: req.body.color,
  //           // SKU: req.body.SKU,
  //           price: req.body.price,
  //           status: req.body.status,
  //           tag: req.body.status,
  //           description: req.body.description,
  //           quantity: req.body.quantity,
  //           date: req.body.date,
  //           category: req.body.category,
  //           subcategory: req.body.subcategory,
  //           image: {
  //             data: req.file.filename,
  //             contentType: "image/png",
  //           },
  //           // image: req.body.testImage,
  //           // image: {
  //           //   data: req.file.filename,
  //           //   contentType: "image/png",
  //           // },
  //           // image: {
  //           //   data: req.file.filename,
  //           //   contentType: "image/png",
  //           // },
  //           // testImage: req.file.finename,
  //         },
  //       },
  //       { new: true },
  //       (err, data) => {
  //         if (data === null) {
  //           res.send("No data found");
  //         } else {
  //           res.send("Congratulation: Data updated. updatedProduct = " + data);
  //         }
  //       }
  //     );
  //   }
  // });
};

exports.deleteProduct = async (req, res, next) => {
  console.log("The delete product API has been hit.");
  let deleteId = req.params.id;
  const productAvailable = ImageModel.find({ sku: deleteId });

  try {
    ImageModel.findOneAndDelete({ sku: deleteId }, function (err, docs) {
      if (err) {
        res.send("Error! You have entered wrong key type.");
      } else {
        if (docs === null) {
          res.send("No record with mentioned sku");
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
