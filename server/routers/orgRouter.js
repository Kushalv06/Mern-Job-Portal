import express from "express"
import { postJob } from '../controllers/orgjobcontrollers/postJob.js'
import { getJobs } from '../controllers/orgjobcontrollers/getJobs.js'
import { deleteJob } from '../controllers/orgjobcontrollers/deleteJob.js'
import { getApplicants } from '../controllers/orgjobcontrollers/getApplicants.js'
import { updateApplicationStatus } from '../controllers/orgjobcontrollers/updateApplicationStatus.js'

export const orgRouter = express.Router()

orgRouter.get('/jobs',getJobs)
orgRouter.post('/jobs',postJob)
orgRouter.delete('/job/:jobid',deleteJob)
orgRouter.get('/job/:jobId/applicants',getApplicants)
orgRouter.patch('/applications/:applicationId',updateApplicationStatus)