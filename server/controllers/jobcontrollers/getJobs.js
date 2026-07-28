import Job from '../../models/Job.js'

export async function getJobs(req,res){
    try{
        const jobs = await Job.find({postedBy : req.session.userId},{postedBy:0,__v:0}).sort({createdAt:-1})
        return res.status(200).json({message:"Jobs retrieved successfully",
                success:true,
                jobs
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:'Server error',success:false})
    }
}