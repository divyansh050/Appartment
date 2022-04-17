const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const managerSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    phone: {type:Number,required:true},
    gender:{type:String,required:true},

 },{
     versionKey:false,
     timestamps:true
 })

//  hash the password before saving
// managerSchema.pre('save', function(next){
 managerSchema.pre("save", function(next){

    // if password is not modified then return
    if(!this.isModified('password')) return next();
  
    const hash = bcrypt.hashSync(this.password,6);
    this.password = hash;
    return next();
 })

// function comparePassword(password){
// to compare the password while login
managerSchema.methods.comparePassword = function(password){
    // if same then return true
    // else return false
    return bcrypt.compareSync(password,this.password);
}

const Manager = mongoose.model("Manager",managerSchema);

module.exports = Manager; 
