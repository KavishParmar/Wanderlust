const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


// Validate Review Middle ware 



// Reviews POST Route
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReview));
 
 
 // Delete review from both listing&review collection
 router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


 module.exports = router;