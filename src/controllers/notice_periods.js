const express = require("express")

const Notice = require("../modules/notice_period")

const router = express.Router()




// ****************** notice_period CRUD **********
router.post("/notice_periods", async(req,res)=>{
    try{
       const notice_period =await  Notice.create(req.body)
       return res.status(201).send(notice_period) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("/notice_periods", async(req,res)=>{
  try{
     const notice_period = await Notice.find().populate("job_id").lean().exec()
     return res.status(200).send({notice_period})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
router.get("/notice_periods/:id", async(req,res)=>{
    try{
    const notice_period = await Notice.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({notice_period})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.delete("/notice_periods/:id", async(req,res)=>{
    try{
        const notice_period = await Notice.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(notice_period)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

/// ******************* notice_period CRUD *********

module.exports = router