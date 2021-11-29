const express = require("express")

const Job = require("../modules/job")

const router = express.Router()


// *******************job CRUD ***********************

router.post("", async(req,res)=>{
    try{
       const job =await  Job.create(req.body)
       return res.status(201).send(job) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

router.get("", async(req,res)=>{
  try{
     const job = await Job.find().lean().exec()
     return res.status(200).send({job})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

// **************all the jobs in a particular city **************
router.get("/city/:city", async(req,res)=>{
  try{
  const job = Job.filter((job)=> req.params.city == job.city)

  return res.status(201).send({job})
  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})
// **************all the jobs in a particular city **************




// ***************all the jobs with work from home **************
router.get("/:work_from_home", async(req,res)=>{
  try{
  const job = Job.filter((myjob)=> req.params.work_from_home != myjob.work_from_home)

  return res.status(201).send({job})
  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})

// ***************all the jobs with work from home **************

//*************all the job with notice period 2 month ************** 
router.get("/:notice_period", async(req,res)=>{
  try{
  const job = Job.filter((myjob)=> req.params.notice_period != myjob.notice_period)

  return res.status(201).send({job})
  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})
//*************all the job with notice period 2 month ************** 

// ************* all the job sorted a per rating ****************
router.get("/ratings", async(req,res)=>{
  try{
     const job = await Job.find().sort({rating:-1}).lean().exec()
     return res.status(200).send({job})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
// ************* all the job sorted a per rating ****************

router.get("/:id", async(req,res)=>{
  try{
  const job = await Job.findById(req.params.id).lean().exec()
  return res.status(201).send({job})
  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})

router.patch("/:id", async(req,res)=>{

  try{
      const job = await Job.findByIdAndUpdate(req.params.id, req.body,{new:true})
      return res.status(201).send(job) 
      

  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})

router.delete("/:id", async(req,res)=>{
  try{
      const job = await Job.findByIdAndDelete(req.params.id).lean().exec()
      return res.status(201).send(job)

  }catch(e){
      return res.status(500).json({message:e.message , status: "Failed"})
  }
})
// *******************job CRUD ***********************

module.exports = router