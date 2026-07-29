import express from 'express'
import { orgLogin,orgRegister,orgSignOut,me } from '../controllers/authcontrollers/orgAuth.js'
import { seekerLogin, seekerRegister } from '../controllers/authcontrollers/seekerAuth.js'

export const authRouter = express.Router()

authRouter.post('/organization/login', orgLogin)
authRouter.post('/organization/register', orgRegister)
authRouter.post('/organization/signout', orgSignOut)
authRouter.get('/organization/me',me)

authRouter.post('/jobseeker/register', seekerRegister)
authRouter.post('/jobseeker/login', seekerLogin)
