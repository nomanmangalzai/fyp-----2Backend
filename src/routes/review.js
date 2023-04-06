const express = require("express");
const reviewController = require("../controller/review");
const router = express.Router();
const verifyToken = require("../controller/verifyToken"); // import verifyToken file
const isAuthorized = require("../controller/isAuthorized");

router.post(
  "/postReview",
  verifyToken,
  isAuthorized,
  reviewController.postReview
);
router.get(
  "/viewReviews",
  verifyToken,
  isAuthorized,
  reviewController.viewReviews
);
router.delete(
  "/deleteReview/:id",
  verifyToken,
  isAuthorized,
  reviewController.deleteReview
);
router.get(
  "/searchReview/:id",
  verifyToken,
  isAuthorized,
  reviewController.searchReview
);
module.exports = router;
