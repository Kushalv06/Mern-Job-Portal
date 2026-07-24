import express from 'express'
import { orgLogin,orgRegister,orgSignOut,me } from '../controllers/authcontrollers/orgAuth.js'

export const authRouter = express.Router()

authRouter.post('/organization/login', orgLogin)
authRouter.post('/organization/register', orgRegister)
authRouter.post('/organization/signout', orgSignOut)
authRouter.get('/organization/me',me)