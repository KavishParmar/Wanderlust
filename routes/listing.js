const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const mongoose = require("mongoose");
const {isLoggedIn, isOwner, validateListing,saveRedirectUrl} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage, cloudinary} = require("../cloudConfig.js");
const upload = multer({storage})


// New route
router.get("/new",isLoggedIn, listingController.renderNewForm);
 
//  ## INDEX ROUTE  && Create route
router.route("/") 
    .get(wrapAsync (listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing))

// Show route , Update route  &&  Delete route
 router.route("/:id")
   .get(saveRedirectUrl, wrapAsync(listingController.showListing))
   .put(isLoggedIn, saveRedirectUrl, isOwner, upload.single('listing[image]'), validateListing,wrapAsync (listingController.updateListing))
   .delete(isLoggedIn, saveRedirectUrl, isOwner, wrapAsync (listingController.deleteListing))

 

// Edit route
router.get("/:id/edit", isLoggedIn, saveRedirectUrl, isOwner, wrapAsync (listingController.renderEditForm));
 


module.exports = router;