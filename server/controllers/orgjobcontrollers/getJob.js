import Job from '../../models/Job.js'

export async function getJob(req,res){
    try {
        const { jobId } = req.params;

        const job = await Job.findOne({
            _id: jobId,
            postedBy: req.session.userId
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            job
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}