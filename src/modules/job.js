const mongoose = require("mongoose")


// ******************* job Schema ****************

const jobSchema = new mongoose.Schema({
    job_title:{type:String , required:true},
    salary_per_month:{type:String, required: true  },
    rating:{type:Number , required:true},
},{
    versionKey: false ,
    timestamps: true
})

module.exports = mongoose.model("job", jobSchema)

// ******************* job Schema ****************

