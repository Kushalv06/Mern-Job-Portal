import express from 'express'
import cors from 'cors'
import session from 'express-session'
import 'dotenv/config'
import { apiRouter } from './routers/apiRouter.js'
import connectDb from './config/db.js'

const PORT = 8000
const secret = process.env.SESSION_SECRET

try{
    await connectDb()
    const app = express()
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))
    app.use(express.json())
    app.use(session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie:{
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        }
    }))
    app.use('/api', apiRouter)
    app.listen(PORT, () => console.log("Server listening on Port",PORT))
}
catch(err){
    console.error('Error occured',err)
    process.exit(1)
}






