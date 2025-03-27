// const mongoose= require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// //  ##MONGOOSE  
// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust");
// }
// main().then(()=> console.log("Connected to db")).catch((err)=> console.log(err));

// const initDB = async () =>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({
//         ...obj,
//         owner: "67d36284a4bc5f08565e475f",
//     }));
//     await Listing.insertMany(initData.data)
//     .then(() => console.log("data was saved"))
//     .catch((err) => console.log(err));
//     // console.log("Data was initialized");
// }

// initDB();