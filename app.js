//(1). we need to add category field in module.listing.js to filter listings
//(2). Write backend for filter listings acc. to given filters
//(3). Apply media queries to maintain css for small screens & try to use 'Bootstrap'
//(4). Add a search bar to search for listings
//(5). Search functionallity
//(6). Add a feature to add multiple images for a listing
//(7). Add a feature to add multiple categories for a listing

if (process.env.NODE_ENV != "production") {
   require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
// const { any } = require("joi");
const dburl = process.env.ATLASDB_URL;


const listingRouter = require("./routes/listing.js");
const reviewRouter= require("./routes/review.js");
const userRouter = require("./routes/user.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// Session store
const store = MongoStore.create({
   mongoUrl:dburl,
   crypto:{
      secret:process.env.SECRET,
   },
   touchAfter: 24 * 60 * 60, //time period in seconds (24 hours)
});
store.on("error",(err)=>{
   console.log("ERROR in Session store",err);
});
const sessionOptions ={
   store,   //it is equals to this (store:store,) 
   secret:process.env.SECRET,
   resave:false,
   saveUninitialized:true,
   cookie:{
      expires:Date.now() + 7 * 24 * 60 * 60 *1000, //count in mili seconds (7 days)
      maxAge: 7 * 24 * 60 * 60 *1000,
      httpOnly : true,
   }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// to serialize/deserialize of login sessions 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Storing local variables
app.use((req,res,next)=>{
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;
   return next();
});



//  ##MONGOOSE  
main().then(()=> console.log("Connected to DB")).catch((err)=> console.log(err));
async function main() {
    await mongoose.connect(dburl);
}




// ALL listing routes 
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews/",reviewRouter);
app.use("/",userRouter);

//  For WRONG ROUTE  
app.all("*",(req,res,next)=>{
   next(new expressError(404,"Page not found"));
})

// Error Middleware
app.use((err,req,res,next)=>{
   let{status=500,message="Something went wrong"} = err;
   res.status(status).render("error.ejs",{message}); 
   // console.log(err);
   return next();
})
 

 //  Server is listening 
app.listen(8080,()=> console.log("Server is listening for app.js"))