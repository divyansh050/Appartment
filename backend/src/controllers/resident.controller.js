const express = require("express");

const router = express.Router();

const Resident = require("../models/resident.model");

router.post("/", async (req, res) => {
    try{
        const resident = await Resident.create(req.body).lean().exec();
        res.status(201).json(resident);

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    try{

        let apartment_id = req.query.apartment_id;

        if(apartment_id){
            const residents = await Resident.find({apartment_id}).lean().exec();
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