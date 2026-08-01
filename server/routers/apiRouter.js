import express from 'express'
import { authRouter } from './authRouter.js'
import { orgRouter } from './orgRouter.js'
import { seekerRouter } from './seekerRouter.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { requireOrganization } from '../middleware/requireOrganization.js'
import { requireSeeker } from '../middleware/requireSeeker.js'

export const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/organization', checkAuth, requireOrganization, orgRouter)
apiRouter.use('/jobseeker', checkAuth, requireSeeker, seekerRouter)
