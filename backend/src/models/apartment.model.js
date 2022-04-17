const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    total_resident:{type:Number,required:true},
    total_flats:{type:Number,required:true},
    block_wise_flats:[],
    block_wise_residents:[],


});

const Apartment = mongoose.model("Apartment",apartmentSchema);

module.exports = Apartment;