const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res) =>{
    res.render("user/signup.ejs");
};

module.exports.signup = async (req,res) =>{
    try {
        let {username, email, password}= req.body;
        const newUser = new User({ email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wanderLust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    } 
};

module.exports.renderLoginForm =(req,res) =>{
    res.render("user/login.ejs");
};

module.exports.login =  async (req,res) =>{
    let redirectUrl = res.locals.redirectUrl;
    req.flash("success", "Welcome back to WanderLust!");
    if(redirectUrl !== "/login"){
       res.redirect(redirectUrl);
    }else{
       res.redirect("/listings");
    }
};

module.exports.logout = (req,res,next) => {
    req.logout((err) =>{
        if(err) {
            return next(err)
        }
        req.flash("success", "Logged you out");
        res.redirect("/listings");
    });
 };