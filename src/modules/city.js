const mongoose = require("mongoose")

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
module.exports = mongoose.model("city", citySchema)
// ******************* city Schema **********