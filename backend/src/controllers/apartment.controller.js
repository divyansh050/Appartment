const express = require("express");

const router = express.Router();

const Apartment = require("../models/apartment.model");

router.post("/", async(req, res) => {
    try{
        const apartment = await Apartment.create(req.body).lean().exec();
        res.status(201).send(apartment);


    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    try{
        const apartments = await Apartment.find().lean().exec();

        res.status(200).send(apartments);

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

const ApartmentController = router;

module.exports = ApartmentController;