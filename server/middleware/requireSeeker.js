export function requireSeeker(req,res,next){
    if(req.session.role !== 'seeker'){
        return res.status(401).json({message:"Unauthorized",success:false})
    }
    next()
}
