const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    block:{type:String,required:true},
    total_resident:{type:Number,required:true},
    flat_no:{type:Number,required:true},
    image:[],
    status:{type:Boolean,default:true},
},{
    versionKey:false,
    timestamps:true
});

const Flat = mongoose.model("Flat",flatSchema);

module.exports = Flat;

 