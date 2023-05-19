const express = require("express");
const res = require("express/lib/response");
const review = require("../models/review");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";
const verifyToken = require("./verifyToken");

exports.postReview = async (req, res, next) => {
  console.log("The post Review API has been called.");

  const {
    productName,
    customerName,
    email,
    rating,
    reviewTitle,
    reviewMessage,
    date,
  } = req.body;

  const idOfReview = req.body.reviewId;
  console.log(rating);
  let deleteReviewId = req.params.id;
  //check duplicate review
  const checkDuplicateReview = await review.findOne({
    _id: idOfReview,
  });
  console.log("checkDuplicateReview =  " + checkDuplicateReview);

  if (checkDuplicateReview) {
    return res
      .status(403)
      .json({ message: "Review with this id already exists" });
  }

  //   if ((customerId && productName && customerName && Rating && Date) === null) {
  const newReview = new review({
    productName: productName,
    customerName: customerName,
    email: email,
    rating: rating,
    reviewTitle: reviewTitle,
    reviewMessage: reviewMessage,
    date: date,
  });
  console.log(newReview);
  //below is saving
  await newReview.save().then((result) => {
    return res.status(201).json({
      message: "The review has been successfully stored.",
    });
  });
  //}
};
exports.viewReviews = async (req, res, next) => {
  //good
  console.log("view reviews api called.");
  try {
    const fetchedReviews = await review.find({});
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
