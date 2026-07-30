import express from "express"
import { postJob } from '../controllers/orgjobcontrollers/postJob.js'
import { getJobs } from '../controllers/orgjobcontrollers/getJobs.js'
import { deleteJob } from '../controllers/orgjobcontrollers/deleteJob.js'

export const orgRouter = express.Router()

orgRouter.get('/jobs',getJobs)
orgRouter.post('/jobs',postJob)
orgRouter.delete('/jobs/:jobid',deleteJob)