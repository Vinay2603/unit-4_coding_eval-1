const mongoose = require("mongoose")


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

module.exports = mongoose.model("work", work_from_homeSchema)
// *******************  work_from_home Schema ********** //