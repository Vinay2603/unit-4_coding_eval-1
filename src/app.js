const express = require("express")

const mongoose = require("mongoose")
const { any, short } = require("webidl-conversions")

const connect =()=>{
    return mongoose.connect(" mongodb://127.0.0.1:27017")
}



// ******************* job Schema ****************

const jobSchema = new mongoose.Schema({
    job_title:{type:String , required:true},
    salary_per_month:{type:String, required: true  },
    rating:{type:Number , required:true},
},{
    versionKey: false ,
    timestamps: true
})

const Job = mongoose.model("job", jobSchema)

// ******************* job Schema ****************

// ******************* city Schema  **********
const citySchema = new mongoose.Schema({
    
    city:{type:String , required:true},
    job_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true 
    }]
},{
    versionKey: false ,
    timestamps: true
})

const City = mongoose.model("city", citySchema)
// ******************* city Schema **********


// *******************  work_from_home Schema ********** //
const work_from_homeSchema = new mongoose.Schema({
    
    work_from_home :{type:Boolean , required:true},
    job_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true 
    }]
},{
    versionKey: false ,
    timestamps: true
})

const Work = mongoose.model("work", work_from_homeSchema)
// *******************  work_from_home Schema ********** //


// ******************* notice_period Schema *********** 
const notice_periodSchema = new mongoose.Schema({
    
    notice_period :{type:Number , required: true},
    job_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true 
    }]
},{
    versionKey: false ,
    timestamps: true
})

const Notice = mongoose.model("notice", notice_periodSchema)

// ******************* notice_period Schema *********** 

// ***********  company Schema *****************
const companySchema = new mongoose.Schema({
    
    company :{type:String , required:true},
    job_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"job",
        required:true 
    }]
},{
    versionKey: false ,
    timestamps: true
})

const Company = mongoose.model("company", companySchema)

// ************  company Schema ****************


const app = express()
app.use(express.json())

// *******************job CRUD ***********************

app.post("/jobs", async(req,res)=>{
      try{
         const job =await  Job.create(req.body)
         return res.status(201).send(job) 


      }catch(e){
          return res.status(500).json({message:e.message , status: "Failed"})
      }
})

app.get("/jobs", async(req,res)=>{
    try{
       const job = await Job.find().lean().exec()
       return res.status(200).send({job})

    }catch(e){
          return res.status(500).json({message:e.message , status: "Failed"})
      }
})
/*
// **************all the jobs in a particular city **************
app.get("/jobs/city/:city", async(req,res)=>{
    try{
    const job = Job.filter((job)=> req.params.city == job.city)

    return res.status(201).send({job})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
// **************all the jobs in a particular city **************




// ***************all the jobs with work from home **************
app.get("/jobs/:work_from_home", async(req,res)=>{
    try{
    const job = Job.filter((myjob)=> req.params.work_from_home != myjob.work_from_home)

    return res.status(201).send({job})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

// ***************all the jobs with work from home **************

//*************all the job with notice period 2 month ************** 
app.get("/jobs/:notice_period", async(req,res)=>{
    try{
    const job = Job.filter((myjob)=> req.params.notice_period != myjob.notice_period)

    return res.status(201).send({job})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
//*************all the job with notice period 2 month ************** 
*/
// ************* all the job sorted a per rating ****************
app.get("/ratings", async(req,res)=>{
    try{
       const job = await Job.find().sort({rating:-1}).lean().exec()
       return res.status(200).send({job})

    }catch(e){
          return res.status(500).json({message:e.message , status: "Failed"})
      }
})
// ************* all the job sorted a per rating ****************

app.get("/jobs/:id", async(req,res)=>{
    try{
    const job = await Job.findById(req.params.id).lean().exec()
    return res.status(201).send({job})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.patch("/jobs/:id", async(req,res)=>{

    try{
        const job = await Job.findByIdAndUpdate(req.params.id, req.body,{new:true})
        return res.status(201).send(job) 
        

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.delete("/jobs/:id", async(req,res)=>{
    try{
        const job = await Job.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(job)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
// *******************job CRUD ***********************





// ****************** city CRUD **************
app.post("/citys", async(req,res)=>{
    try{
       const city =await  City.create(req.body)
       return res.status(201).send(city) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/citys", async(req,res)=>{
  try{
     const city = await City.find().populate("job_id").lean().exec()
     return res.status(200).send({city})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/citys/:id", async(req,res)=>{
    try{
    const city = await City.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({city})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.delete("/citys/:id", async(req,res)=>{
    try{
        const city = await City.findByIdAndDelete(req.params.id).populate("job_id").lean().exec()
        return res.status(201).send(city)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
// ****************** city CRUD **************

// ****************** work_from_home CRUD **********
app.post("/work_from_homes", async(req,res)=>{
    try{
       const work_from_home =await  Work.create(req.body)
       return res.status(201).send(work_from_home) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/work_from_homes", async(req,res)=>{
  try{
     const work_from_home = await Work.find().populate("job_id").lean().exec()
     return res.status(200).send({work_from_home})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/work_from_homes/:id", async(req,res)=>{
    try{
    const work_from_home = await Work.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({work_from_homes})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.delete("/work_from_homes/:id", async(req,res)=>{
    try{
        const work_from_home = await Work.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(work_from_home)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

// ****************** work_from_home CRUD **********


// ****************** notice_period CRUD **********
app.post("/notice_periods", async(req,res)=>{
    try{
       const notice_period =await  Notice.create(req.body)
       return res.status(201).send(notice_period) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/notice_periods", async(req,res)=>{
  try{
     const notice_period = await Notice.find().populate("job_id").lean().exec()
     return res.status(200).send({notice_period})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
app.get("/notice_periods/:id", async(req,res)=>{
    try{
    const notice_period = await Notice.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({notice_period})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.delete("/notice_periods/:id", async(req,res)=>{
    try{
        const notice_period = await Notice.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(notice_period)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

/// ******************* notice_period CRUD *********

// ****************** company CRUD *********** 
app.post("/companys", async(req,res)=>{
    try{
       const company =await  Company.create(req.body)
       return res.status(201).send(company) 


    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.get("/companys", async(req,res)=>{
  try{
     const company = await Company.find().populate("job_id").lean().exec()
     return res.status(200).send({company})

  }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})
app.get("/companys/:id", async(req,res)=>{
    try{
    const company = await Company.findById(req.params.id).populate("job_id").lean().exec()
    return res.status(201).send({company})
    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})

app.delete("/companys/:id", async(req,res)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(company)

    }catch(e){
        return res.status(500).json({message:e.message , status: "Failed"})
    }
})


// ****************** company CRUD *********** 











app.listen(3456, async()=>{
    await connect()
    console.log("listing on port 3456")
})