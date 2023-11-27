const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name : { 
    type : String,
},
address: {
    type: String,
 },
 isDoctor : {
    type : Boolean,
    default : false
 },
 aadharNumber : {
    type : String,
 },
 gender : {
   type : String,
 }
});

module.exports = mongoose.model("User", userSchema)