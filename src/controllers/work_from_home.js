const express = require("express")

const Work = require("../modules/work_from_home")

const router = express.Router()




// ****************** work_from_home CRUD **********
router.post("", async(req,res)=>{
    try{
       const work_from_home =await  Work.create(req.body)
       return res.status(201).send(work_from_home) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("", async(req,res)=>{
  try{
     const work_from_home = await Work.find().populate("job_id").lean().exec()
     return res.status(200).send({work_from_home})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("/:id", async(req,res)=>{
    try{
    const work_from_home = await Work.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({work_from_homes})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const work_from_home = await Work.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(work_from_home)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

// ****************** work_from_home CRUD **********

module.exports = router