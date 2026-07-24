import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
    jobTitle : {type:String, required:true},
    jobDescription : {type:String, required:true},
    location : {type:String, required:true},
    jobType : {type:String, required:true},
    salary : {type:String,required : true},
    postedBy : {type:mongoose.Schema.Types.ObjectId,ref: "Organization",required : true}
    },
    {
    timestamps:true
})

const Job = mongoose.model('Job',jobSchema)

export default Job