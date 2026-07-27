import express from "express"
import { postJob } from '../controllers/jobcontrollers/postJob.js'
import { getJobs } from '../controllers/jobcontrollers/getJobs.js'
import { deleteJob } from '../controllers/jobcontrollers/deleteJob.js'

export const orgRouter = express.Router()

orgRouter.get('/jobs',getJobs)
orgRouter.post('/jobs',postJob)
orgRouter.delete('/jobs/:jobid',deleteJob)