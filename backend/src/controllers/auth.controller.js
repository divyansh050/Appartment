
const jwt = require("jsonwebtoken");
require("dotenv").config()

const Manager = require("../models/manager.model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const login = async (req,res) => {
    try{
      const { email, password } = req.body;
      // check if email and password is valid
      const manager = await Manager.findOne({ email });

      // if email is not found
      // return error message
      if (!manager) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

      // check password with store password

      const isMatch = await manager.comparePassword(password);

      // if password is not correct
      // return error message
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid email or password",
        });
      }

        // if everything is correct
        // generate new token and return it
      const token = newToken(manager);

      return res.status(200).send({ token, manager });
    }catch(e){
        console.log(e);
    }
}

const register = async (req,res) => {
    try{
        const {email} = req.body;

        // check if email is already exist
        const manager = await Manager.findOne({email});

        // if email is already exist
        // return error message
        if(manager){
            return res.status(400).json({
                message:"Email is already exist"
            })
        }

        // if email is not exist
        // create new manager

        const newManager = Manager.create(req.body).lean().exec();

        return res.status(200).send(newManager);

    }catch(e){
        console.log(e);
    }
}

module.exports = { login, register };