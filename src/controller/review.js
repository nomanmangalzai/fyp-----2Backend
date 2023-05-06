const express = require("express");
const res = require("express/lib/response");
const review = require("../models/review");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const verifyToken = require("./verifyToken");

exports.postReview = async (req, res, next) => {
  console.log("The post Review API has been called.");

  // const { productName, customerName, Rating, Date } = req.body;
  // const idOfReview = req.body.reviewId;
  // console.log(Rating);
  // let deleteReviewId = req.params.id;
  // const checkDuplicateReview = await review.findOne({
  //   reviewId: idOfReview,
  // });
  // console.log(checkDuplicateReview);

  // if (checkDuplicateReview) {
  //   return res
  //     .status(403)
  //     .json({ message: "Review with this id already exists" });
  // }

  // //   if ((customerId && productName && customerName && Rating && Date) === null) {
  // const newReview = new review({
  //   reviewId: idOfReview,
  //   productName: productName,
  //   customerName: customerName,
  //   Rating: Rating,
  //   Date: Date,
  // });
  // console.log(newReview);
  // //below is saving
  // await newReview.save().then((result) => {
  //   return res.status(201).json({
  //     message: "The review has been successfully stored.",
  //   });
  // });
  // //}
};
exports.viewReviews = async (req, res, next) => {
  console.log("view reviews api called.");
  try {
    const fetchedReviews = await review.find({}, { _id: 0, __v: 0 });
    res.send(fetchedReviews);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteReview = async (req, res, next) => {
  console.log("Delete Review API has been called.");
  let deleteReviewId = req.body.id;
  review.deleteMany({ reviewId: deleteReviewId }, function (err, docs) {
    if (err) {
      res.send("Error! You have entered wrong key.");
    } else {
      if (docs === null) {
        res.send("Wrong ID");
      } else {
        res.send(
          "The requested review with reviewId = " +
            deleteReviewId +
            " has been deleted"
        );
      }
    }
  });
};

exports.searchReview = async (req, res, next) => {
  console.log("search review api called.");
  //we can search reviews only for customer and product.
  let searchedReview = await review.find(
    {
      $or: [
        { productName: { $regex: req.params.id } },
        { customerName: { $regex: req.params.id } },
      ],
    },
    { _id: 0, __v: 0 }
  );

  //   res.send(searchedReview);
  res.status(200).json({
    status: "success",
    results: searchedReview.length,
    data: {
      searchedReview,
    },
  });
};
