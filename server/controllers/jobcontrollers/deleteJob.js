import mongoose from 'mongoose'
import Job from '../../models/Job.js'

export async function deleteJob(req,res){
    const jobId = req.params.jobid

    if(!mongoose.Types.ObjectId.isValid(jobId)) {
        return res.status(400).json({
            message: 'Invalid Job ID',
            success: false
        })
    }

    try{
        const deletedJob = await Job.findOneAndDelete({_id:jobId,postedBy:req.session.userId})
    
        if(!deletedJob){
            return res.status(404).json({
                message:'Job not found',
                success:false})
        }

        return res.status(200).json({
            message: 'Job deleted successfully',
            success: true})
          
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Server error',
            success:false})
    }




}