import mongoose from "mongoose"

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seeker",
        required: true
    }
}, {
    timestamps: true
})

const Application = mongoose.model("Application", applicationSchema)

export default Application