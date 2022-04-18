const express = require("express");
const Flat = require("../models/flat.model");

const router = express.Router();

const Resident = require("../models/resident.model");

router.post("/", async (req, res) => {
    try{
        const resident = await Resident.create(req.body);

        const flat  = await Flat.findById(resident.flat_id).lean().exec();
        flat.status = true;
        flat.total_resident = flat.total_resident + req.body.total_resident;


        const updated = Flat.findByIdAndUpdate(resident.flat_id,{...flat},{new:true}).exec();
        // console.log(updated);

        res.status(201).send(resident);



    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/", async(req,res) => {
    const block = req.query.block;
    const sort = req.query.sort;
    const type = req.query.type;
    try{
        if(block){
            const residents = await Resident.find().populate('flat_id').exec((err,residents) => {
                
                if(err){
                    return res.status(500).send(err.message);
                }
                const filtered = residents.filter(resident => resident.flat_id.block === block);
                return res.status(200).send(filtered);
            }
            );
            
        }else if(sort){
            const residents = await Resident.find().populate('flat_id').exec((err,residents) => {
                
                if(err){
                 
                    return res.status(500).send(err.message);
                }
                
                if(sort === "asc"){
                    const sorted = [...residents].sort(
                      (a, b) => +a.flat_id.flat_no - +b.flat_id.flat_no
                    );

                    return res.status(200).send(sorted);
                }else{
                    const sorted = [...residents].sort(
                      (a, b) => +b.flat_id.flat_no - +a.flat_id.flat_no
                    );

                    return res.status(200).send(sorted);
                }
                
            }
            );
        }else if(type){
            const residents = await Resident.find({type:type}).populate('flat_id').exec((err,residents) => {
                
                if(err){
                 
                    return res.status(500).send(err.message);
                }
                
                    return res.status(200).send(residents);
                 
            }
            );
        }
        else{
            const residents = await Resident.find()
              .populate("flat_id")
              .lean()
              .exec();
            res.status(200).send(residents);
        }
        
    }catch(e){
        console.log(e)
        return res.status(500).send(e.message);
    }
})

router.get("/:id", async (req, res) => {
  try {
      
    const residents = await Resident.findById(req.params.id).populate("flat_id").lean().exec();
    res.status(200).send(residents);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e.message);
  }
});

const ResidentController = router;

module.exports = ResidentController;