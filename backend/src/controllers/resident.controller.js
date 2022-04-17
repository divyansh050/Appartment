const express = require("express");
const Flat = require("../models/flat.model");

const router = express.Router();

const Resident = require("../models/resident.model");

router.post("/", async (req, res) => {
    try{
        const resident = await Resident.create(req.body);

        const flat  = await Flat.findById(resident.flat_id).lean().exec();
        flat.status = true;


        const updated = Flat.findByIdAndUpdate(resident.flat_id,{...flat},{new:true}).exec();
        // console.log(updated);

        res.status(201).send(resident);



    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    try{

            const residents = await Resident.find().lean().exec();
            res.status(200).send(residents);
          
        

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

const ResidentController = router;

module.exports = ResidentController;