import express from 'express'
import { authRouter } from './authRouter.js'

export const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
