import validator from 'validator'
import Seeker from '../../models/Seeker.js'

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