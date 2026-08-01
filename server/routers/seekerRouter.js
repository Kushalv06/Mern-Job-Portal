import express from "express"
import { getAllJobs } from '../controllers/seekerjobcontrollers/getAllJobs.js'

export const seekerRouter = express.Router()

seekerRouter.get('/jobs', getAllJobs)
