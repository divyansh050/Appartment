const mongoose = require("mongoose");


const residentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    type:{type:String,required:true},
    flat_id:{type:mongoose.Schema.Types.ObjectId,ref:"Flat"}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);



const Resident = mongoose.model("Resident", residentSchema);

module.exports = Resident;

// {
//       "name": "Mohan Das",
//     "age": 32,
//     "gender": "Male",
//     "type":"tenant",
    // "total_resident":2,
//     "flat_id":"625c97981283eb1cde85c4df"

// }


