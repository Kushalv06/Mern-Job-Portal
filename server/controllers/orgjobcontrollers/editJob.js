import Job from "../../models/Job.js"

export async function editJob(req,res){
    try {
        const { jobId } = req.params;

        let { jobDescription, location, salary, jobType } = req.body;

        if (
            jobDescription === undefined ||
            location === undefined ||
            salary === undefined ||
            jobType === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        jobDescription = jobDescription.trim();
        location = location.trim();
        salary = salary.trim();
        jobType = jobType.trim();

        if (
            !jobDescription ||
            !location ||
            !salary ||
            !jobType
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled"
            });
        }

        console.log(jobType,1)
        const allowedJobTypes = ["remote", "on-site", "hybrid", "internship", "full time", "part time", "contract"]
        const normalizedJobType = jobType.toLowerCase()
        console.log(jobType,2)

        if (!allowedJobTypes.includes(normalizedJobType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job type"
            });
        }

        const job = await Job.findOne({
            _id: jobId,
            postedBy: req.session.userId
        })

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        job.jobDescription = jobDescription;
        job.location = location;
        job.salary = salary;
        job.jobType = jobType;

        await job.save();

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
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