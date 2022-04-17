const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    block:{type:String,required:true},
    total_resident:{type:Number,default:0},
    flat_no:{type:Number,required:true},
    image:[],
    status:{type:Boolean,default:false},
},{
    versionKey:false,
    timestamps:true
});

const Flat = mongoose.model("Flat",flatSchema);

module.exports = Flat;




 