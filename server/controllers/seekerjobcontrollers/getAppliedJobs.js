import Application from "../../models/Application.js"

export async function getAppliedJobs(req, res) {
    try {
        const seekerId = req.session.userId

        const appliedJobs = await Application.find({ seekerId })
            .populate({
                path: 'jobId',
                select: '-jobDescription -__v',
                populate: {
                    path: 'postedBy',
                    select: 'orgName'
                }
            })


        return res.status(200).json({
            success: true,
            appliedJobs
        })
    } catch (err) {
        console.error('getAppliedJobs error:', err)
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}