const mongoose = require("mongoose")

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

module.exports = mongoose.model("company", companySchema)

// ************  company Schema ****************