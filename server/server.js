import express from 'express'
import cors from 'cors'
import session from 'express-session'
import 'dotenv/config'
import { apiRouter } from './routers/apiRouter.js'
import connectDb from './config/db.js'
import MongoStore from "connect-mongo"

const PORT = process.env.PORT || 8000;
const secret = process.env.SESSION_SECRET

try{
    await connectDb()
    const app = express()
    app.set("trust proxy", 1)
    app.use(cors({
        origin: ["http://localhost:5173",
            process.env.CLIENT_URL
        ],
        credentials: true
    }))
    app.use(express.json())
    app.use(session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL_LINK
        }),
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"? "none" : "lax"
        }
    }))
    app.use('/api', apiRouter)
    app.listen(PORT, () => console.log("Server listening on Port",PORT))
}
catch(err){
    console.error('Error occured',err)
    process.exit(1)
}






