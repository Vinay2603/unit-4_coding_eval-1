const mongoose = require("mongoose")


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

module.exports= mongoose.model("notice", notice_periodSchema)

// ******************* notice_period Schema *********** 