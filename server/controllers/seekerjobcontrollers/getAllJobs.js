import Job from '../../models/Job.js'

export async function getAllJobs(req,res){
    try{
        const jobs = await Job.find({},{__v:0})
            .populate('postedBy', 'orgName')
            .sort({createdAt:-1})

        return res.status(200).json({
            message:'Jobs retrieved successfully',
            success:true,
            jobs
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:'Server error',success:false})
    }
}
