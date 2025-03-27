// const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
    // Username and passport are by default defined by passport-mongoose ,with salting and hashing but we can create if we want to make username/password 
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
