const express = require("express")

const Company = require("./modules/company")

const router = express.Router()




// ****************** company CRUD *********** 
router.post("/companys", async(req,res)=>{
    try{
       const company =await  Company.create(req.body)
       return res.status(201).send(company) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("/companys", async(req,res)=>{
  try{
     const company = await Company.find().populate("job_id").lean().exec()
     return res.status(200).send({company})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
router.get("/companys/:id", async(req,res)=>{
    try{
    const company = await Company.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({company})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.delete("/companys/:id", async(req,res)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(company)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})


// ****************** company CRUD *********** 

module.exports = router