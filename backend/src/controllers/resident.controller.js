const express = require("express");
const Flat = require("../models/flat.model");

const router = express.Router();

const Resident = require("../models/resident.model");

router.post("/", async (req, res) => {
    try{
        const resident = await Resident.create(req.body);

        const flat  = await Flat.findById(resident.flat_id);
        flat.status = false;

        const updated = Flat.findByIdAndUpdate(resident.flat_id,flat,{new:true});
        console.log(updated);

        res.status(201).send(resident);



    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    try{

        

        if(apartment_id){
            const residents = await Resident.find().lean().exec();
            res.status(200).send(residents);
        }else{  // if apartment_id is not provided
            
            res.status(400).send("apartment_id is required");
        }

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

const ResidentController = router;

module.exports = ResidentController;