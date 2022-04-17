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
/*
router.get("/", async(req,res) => {
    try{
        const flats = await Flat.find().lean().exec();

        res.status(200).send(flats);

    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})
*/

router.get("/", async(req,res) => {
    const block = req.query.block;
    const sort = req.query.sort;
    try{
        if(block){
            const flats = await Flat.find({block:block}).exec((err,flats) => {
                
                if(err){
                    return res.status(500).send(err.message);
                }
               
                return res.status(200).send(flats);
            }
            );
            
        }else if(sort){
            const flats = await Flat.find().exec((err,flats) => {
              
                
                if(err){
                 
                    return res.status(500).send(err.message);
                }
                
                if(sort === "asc"){
                    const sorted = [...flats].sort(
                      (a, b) => +a.flat_no - +b.flat_no
                    );

                    return res.status(200).send(sorted);
                }else{
                    const sorted = [...flats].sort(
                      (a, b) => +b.flat_no - +a.flat_no
                    );

                    return res.status(200).send(sorted);
                }
                
            }
            );
        }
        else{
            const flats = await Flat.find()
              .lean()
              .exec();
            res.status(200).send(flats);
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})


const FlatController = router;

module.exports = FlatController;