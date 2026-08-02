import Job from '../../models/Job.js'
import Application from '../../models/Application.js'

export async function applyJob(req, res) {
    try {
        const seekerId = req.session.userId
        const jobId = req.params.id

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        }

        const existingApplication = await Application.findOne({ jobId, seekerId })
        if (existingApplication) {
            return res.status(409).json({
                message: 'You have already applied for this job',
                success: false
            })
        }

        await Application.create({ jobId, seekerId })

        return res.status(201).json({
            message: 'Successfully applied for the job',
            success: true
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}