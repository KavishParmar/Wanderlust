const Listing = require("../models/listing.js");
const axios = require("axios");


module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 };

 module.exports.renderNewForm = (req,res)=>{
    // if(!req.isAuthenticated()) {
    //    req.flash("error", "You must be login to create listing!");
    //    return res.redirect("/login");
    // }
    res.render("listings/new.ejs");
 };

 module.exports.createListing = async(req,res,next)=>{
    // Make a request to the Google Geocoding API
    const geoResponse = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
            address: req.body.listing.location,
            key: process.env.MAP_API_KEY,  
        },
    });

      if(geoResponse.data.status !== "OK"){
        req.flash("error","Invalid Location");
        return res.redirect("/listings/new");
      }

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

    newListing.geometry = {
      type:geoResponse.data.results[0].geometry.location_type,
      coordinates:[
         geoResponse.data.results[0].geometry.location.lng,
         geoResponse.data.results[0].geometry.location.lat,
      ],
   };

    await newListing.save();

    req.flash("success","New Listing Added!");
    res.redirect("/listings");

};

 module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
       populate:"author",
    })
    .populate("owner");
    if(!listing){
       req.flash("error","Listing you requested does not exist or deleted");
       res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
 }

 module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
       req.flash("error","Listing you requested does not exist or deleted");
       res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/h_150,w_250");
    res.render("listings/edit.ejs",{listing , originalImageUrl});
 };

module.exports.updateListing = async (req,res)=>{
   let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

     if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save();
     }
   req.flash("success","Listing Updated!");
   res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted successfully");
    res.redirect(`/listings`);
 };

