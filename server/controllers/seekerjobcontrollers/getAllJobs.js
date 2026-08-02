import Job from '../../models/Job.js'
import Application from '../../models/Application.js'

export async function getAllJobs(req,res){
    const seekerId = req.session.userId
    try{
        const jobs = await Job.find({},{__v:0})
            .populate('postedBy', 'orgName')
            .sort({createdAt:-1})

        const appliedJobs = await Application.find({seekerId},{jobId:1,_id:0})

        return res.status(200).json({
            message:'Jobs retrieved successfully',
            success:true,
            jobs,
            appliedJobs
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:'Server error',success:false})
    }
}
