const express = require("express")

const City = require("../modules/city")

const router = express.Router()



// ****************** city CRUD **************
router.post("/citys", async(req,res)=>{
    try{
       const city =await  City.create(req.body)
       return res.status(201).send(city) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("/citys", async(req,res)=>{
  try{
     const city = await City.find().populate("job_id").lean().exec()
     return res.status(200).send({city})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("/citys/:id", async(req,res)=>{
    try{
    const city = await City.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({city})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.delete("/citys/:id", async(req,res)=>{
    try{
        const city = await City.findByIdAndDelete(req.params.id).populate("job_id").lean().exec()
        return res.status(201).send(city)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
// ****************** city CRUD **************

module.exports = router