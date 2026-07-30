import validator from 'validator'
import Seeker from '../../models/Seeker.js'
import bcrypt from 'bcryptjs'

export async function seekerRegister(req,res){
    let { seekerName,email,password } = req.body

    if(!seekerName || !email || !password){
        return res.status(400).json({message:'Please fill all required details',success:false})
    }

    seekerName = seekerName.trim()
    email = email.toLowerCase().trim()

    if(!seekerName || !email){
        return res.status(400).json({message:'Please fill all required details not just spaces',success:false})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:'Enter a valid email',success:false})
    }

    if (password.length < 4) {
        return res.status(400).json({ message: "Password should be minimum length of 4 ", success: false })
    }

    try{
        const user = await Seeker.findOne({email})

        if(user){
            return res.status(409).json({
                message: 'User already exists',
                success: false
            })
        }

        const seeker = await Seeker.create({seekerName,email,password})

        req.session.userId = seeker._id
        req.session.role = 'seeker'

        return res.status(201).json({
            message: 'User registered',
            success: true,
            data: {seekerName : seeker.seekerName,email : seeker.email}
        })
    }
    catch(err){
        console.error(err)

        return res.status(500).json({
            message: 'Failed to register',
            success: false
        })
    }
}


export async function seekerLogin(req,res){
    let { email, password } = req.body
    
    if(!email || !password){
        return res.status(400).json({message:'Please fill all required details',success:false})
    }

    email = email.toLowerCase().trim()

    if(!email){
        return res.status(400).json({message:'Please fill all required details not just spaces',success:false})
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({message:'Enter a valid email',success:false})
    }

    try{
        const seeker = await Seeker.findOne({ email })
        
        if(!seeker){
            return res.status(401).json({message:'Invalid credentials',success:false})
        }

        if(!await bcrypt.compare(password, seeker.password)){
            return res.status(401).json({message:'Invalid credentials',success:false})
        }

        req.session.userId = seeker._id
        req.session.role = 'seeker'
        
        return res.status(200).json({
            message: `${seeker.seekerName} logged in`,
            success: true,
            data: { seekerName: seeker.seekerName, email: seeker.email }
        })
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:'Failed to login',success:false})
    }
}

export async function me(req,res){
    if(!req.session.userId || req.session.role !== 'seeker'){
        return res.status(401).json({message: `Unauthorized`,success: false})
    }
    
    try{
        const _id = req.session.userId
        const seeker = await Seeker.findById(_id,{seekerName:1,_id:0})
        if(!seeker){
            return res.status(401).json({message : "Unauthorized", success: false})
        }
        return res.status(200).json({message:"seekerName was retrived successfully from Database",success: true,seekerName:seeker.seekerName})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"server error",success: false})
    }
}

export function seekerSignOut(req,res){
    if(!req.session.userId || req.session.role !== 'seeker'){
        return res.status(401).json({message:"Unauthorized to SignOut", success: false})
    }

    req.session.destroy((err)=>{
        if(err){
            return res.status(500).json({message:"Sign out failed",success: false})
        }

        res.clearCookie('connect.sid')
        return res.status(200).json({message:'Seeker signed out',success: true})
    })
}