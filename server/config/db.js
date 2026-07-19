import mongoose from 'mongoose'
import 'dotenv/config'

export default async function connectDb() {
    await mongoose.connect(process.env.DB_URL_LINK)
}




