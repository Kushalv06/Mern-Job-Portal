import Job from "../../models/Job.js"

export async function postJob(req,res){
    let {jobTitle,jobDescription,location,jobType,salary} = req.body

    if(!jobTitle || !jobDescription || !location || !jobType || !salary){
        return res.status(400).json({message: 'Please include all details like jobTitle, jobDescription, location, jobType, salary',success:false})
    }

    jobTitle = jobTitle.trim()
    jobDescription = jobDescription.trim()
    location = location.trim()
    salary = salary.trim()

    if(!jobTitle || !jobDescription || !location){
        return res.status(400).json({message: 'Please include all details like jobTitle, jobDescription, location, jobType, salary',success:false})
    }

    const jobTypes = ['Full Time','Part Time','Contract','Internship','Hybrid','Remote']

    if(!jobTypes.includes(jobType)){
        return res.status(400).json({message: 'Job type should be one of these [Full Time ,Part Time, Contract, Internship, Hybrid, Remote]',success: false})
    }

    try{
        const jobPost = await Job.create({
            jobTitle,jobDescription,location,jobType,salary,
            postedBy : req.session.userId
        })
    
        return res.status(201).json({message:'Job was posted successfully',success: true})
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:`Server error`,success: false})
    }
} 