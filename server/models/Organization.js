import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const orgSchema = new mongoose.Schema({
    orgName : {type: String, required: true},
    email: {type: String, lowercase:true, required: true, unique: true},
    password: { type:String,required:true}
})

orgSchema.pre('save',async function(){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    }
})

const Organization = mongoose.model('Organization',orgSchema)

export default Organization