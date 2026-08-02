import express from "express"
import { getAllJobs } from '../controllers/seekerjobcontrollers/getAllJobs.js'
import { applyJob } from '../controllers/seekerjobcontrollers/applyJob.js'

export const seekerRouter = express.Router()

seekerRouter.get('/jobs', getAllJobs)
seekerRouter.post('/apply/:id', applyJob)
