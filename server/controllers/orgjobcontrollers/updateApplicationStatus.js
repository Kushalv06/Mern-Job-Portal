import Application from '../../models/Application.js'
import Job from '../../models/Job.js'

export async function updateApplicationStatus(req, res) {
    const applicationId = req.params.applicationId
    const { status } = req.body

    if (!['accepted', 'rejected'].includes(status)) {
        return res.status(400).json({
            message: 'Status must be either "accepted" or "rejected"',
            success: false
        })
    }

    try {
        const application = await Application.findById(applicationId)

        if (!application) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            })
        }

        const job = await Job.findById(application.jobId)

        if (!job || job.postedBy.toString() !== req.session.userId) {
            return res.status(404).json({
                message: 'Application not found',
                success: false
            })
        }

        application.status = status.charAt(0).toUpperCase() + status.slice(1)
        await application.save()

        return res.status(200).json({
            success: true,
            message: `Application ${status} successfully`,
            application
        })
    } catch (err) {
        console.error('updateApplicationStatus error:', err)
        return res.status(500).json({
            message: 'Server error',
            success: false
        })
    }
}