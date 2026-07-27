import express from 'express'
import { authRouter } from './authRouter.js'
import { postJob } from '../controllers/jobcontrollers/postJob.js'
import { getJobs } from '../controllers/jobcontrollers/getJobs.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { requireOrganization } from '../middleware/requireOrganization.js'

export const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.post('/organization/postjob',checkAuth,requireOrganization, postJob)
apiRouter.get('/organization/jobs',checkAuth,requireOrganization, getJobs)
