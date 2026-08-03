import Job from '../../models/Job.js'
import Application from '../../models/Application.js'

export async function getApplicants(req, res) {
    const jobId = req.params.jobId

    try {
        const job = await Job.findById(jobId)

        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        }

        if (job.postedBy.toString() !== req.session.userId) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        }

        const applicants = await Application.find({ jobId })
            .populate('seekerId', 'seekerName email')
            .sort({ createdAt: 1 })


        return res.status(200).json({
            success: true,
            applicants,
            job
        })
    } catch (err) {
        console.error('getApplicants error:', err)
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}