import express from 'express'
import { orgLogin,orgRegister,orgSignOut,me as orgMe } from '../controllers/authcontrollers/orgAuth.js'
import { me as seekerMe, seekerLogin, seekerRegister, seekerSignOut } from '../controllers/authcontrollers/seekerAuth.js'

export const authRouter = express.Router()

authRouter.post('/organization/login', orgLogin)
authRouter.post('/organization/register', orgRegister)
authRouter.post('/organization/signout', orgSignOut)
authRouter.get('/organization/me',orgMe)

authRouter.post('/jobseeker/register', seekerRegister)
authRouter.post('/jobseeker/login', seekerLogin)
authRouter.post('/jobseeker/signout', seekerSignOut)
authRouter.get('/jobseeker/me', seekerMe)
