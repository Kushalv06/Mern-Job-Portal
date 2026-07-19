import express from 'express'
import { orgLogin,orgRegister,me } from '../authcontrollers/orgAuth.js'

export const authRouter = express.Router()

authRouter.post('/organization/login', orgLogin)
authRouter.post('/organization/register', orgRegister)
authRouter.get('/organization/me',me)