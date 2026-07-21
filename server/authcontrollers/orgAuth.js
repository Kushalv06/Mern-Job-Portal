import Organization from "../models/Organization.js"
import validator from "validator"
import bcrypt from "bcryptjs"

export async function orgRegister(req, res) {
    let { orgName, email, password } = req.body

    if (!orgName || !email || !password) {
        return res.status(400).json({ message: "Please ensure to fill all details", success: false })
    }
    orgName = orgName.trim()
    email = email.trim().toLowerCase()

    if (orgName.length === 0 || email.length === 0) {
        return res.status(400).json({ message: "Please ensure to fill all details", success: false })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please enter a valid Email", success: false })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password should be minimum length of 8 ", success: false })
    }

    try {
        const user = await Organization.findOne({ email })
        if (user) {
            return res.status(409).json({
                message: 'User already exists',
                success: false
            })
        }

        const organization = await Organization.create({ orgName, email, password })
        console.log(organization)
        req.session.userId = organization._id
        req.session.role = 'organization'
        return res.status(201).json({
            message: `Registration success`,
            success: true,
            data: { orgName, email }
        })

    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            message: `Server error`,
            success: false
        })
    }
}




export async function orgLogin(req, res) {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Enter all fields compulsorily", success: false })
    }

    email = email.trim().toLowerCase()
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Enter a valid email", success: false })
    }

    try {
        const organization = await Organization.findOne({ email })

        if (!organization) {
            return res.status(401).json({ message: "Invalid credentials", success: false })
        }

        if (!await bcrypt.compare(password, organization.password)) {
            return res.status(401).json({ message: "Invalid credentials", success: false })
        }
        
        req.session.userId = organization._id
        req.session.role = 'organization'

        return res.status(200).json({ message: `${organization.orgName} logged in`, success: true, data: { orgName: organization.orgName, email: organization.email } })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: `Server error`, success: false })
    }

}



export function orgSignOut(req,res){
    if(!req.session.userId || req.session.role !== 'organization'){
        return res.status(401).json({message:"Unauthorized to SignOut", success: false})
    }

    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({message:"Sign out failed",success: false})
        }

        res.clearCookie('connect.sid')
        return res.status(200).json({message:'User signed out',success: true})
    })

}



export async function me(req,res){
    if(!req.session.userId || req.session.role !== 'organization'){
        return res.status(401).json({message: `Unauthorized`,success: false})
    }
    
    try{
        const _id = req.session.userId
        const organization = await Organization.findOne({_id},{orgName:1,_id:0})
        if(!organization){
            return res.status(401).json({message : "Unauthorized", success: false})
        }
        return res.status(200).json({message:"orgName was retrived successfully from Database",success: true,orgName:organization.orgName})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"server error",success: false})
    }
}