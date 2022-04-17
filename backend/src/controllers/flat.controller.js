const express = require("express");

const router = express.Router();

const Flat = require("../models/flat.model");

router.post("/", async(req, res) => {
    try{
        const flat = await Flat.create(req.body);
        res.status(201).send(flat);


    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    try{
        const flats = await Flat.find().lean().exec();

        res.status(200).send(flats);

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

const FlatController = router;

module.exports = FlatController;