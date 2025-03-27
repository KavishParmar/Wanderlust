const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");


// Signup page  &&  Register (Signup) user
router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup))
 
// login page  &&  Login user
router.route("/login")
     .get(userController.renderLoginForm)
     .post(saveRedirectUrl, passport.authenticate('local',{failureRedirect: '/login',failureFlash:true,}), userController.login);


// Logout 
 router.get("/logout",userController.logout );


module.exports = router; 