const express = require("express");
const reviewController = require("../controller/review");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");
const isAdmin = require("../controller/isAdmin");

router.post(
  "/postReview",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  reviewController.postReview
);
router.get(
  "/viewReviews",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  reviewController.viewReviews
);
router.delete(
  "/deleteReview/:id",
  verifyToken,
  isAuthorized,
  isAdmin,
  reviewController.deleteReview
);
router.get(
  "/searchReview/:id",
  // verifyToken,
  // isAuthorized,
  // isAdmin,
  reviewController.searchReview
);
module.exports = router;
