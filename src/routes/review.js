const express = require("express");
const reviewController = require("../controller/review");
const router = express.Router();

router.post("/postReview", reviewController.postReview);
router.get("/viewReviews", reviewController.viewReviews);
router.delete("/deleteReview/:id", reviewController.deleteReview);
router.get("/searchReview/:id", reviewController.searchReview);
module.exports = router;
