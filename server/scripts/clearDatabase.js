import mongoose from "mongoose"
import "dotenv/config"

import Organization from "../models/Organization.js"
import Seeker from "../models/Seeker.js"
import Job from "../models/Job.js"
import Application from "../models/Application.js"

export async function clearDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL_LINK)

        await Organization.deleteMany({})
        await Seeker.deleteMany({})
        await Job.deleteMany({})
        await Application.deleteMany({})

        await mongoose.connection.db.collection("sessions").deleteMany({})

        console.log("Database cleared successfully.")
        console.log("Collections cleared:")
        console.log("- Organizations")
        console.log("- Seekers")
        console.log("- Jobs")
        console.log("- Applications")
        console.log("- Sessions")
    }
    catch (err) {
        console.error("Failed to clear database:", err)
    }
    finally {
        await mongoose.connection.close()
    }
}

await clearDatabase()