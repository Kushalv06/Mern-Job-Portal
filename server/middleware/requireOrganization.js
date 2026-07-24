export function requireOrganization(req,res,next){
    if(req.session.role !== 'organization'){
        return res.status(401).json({message:"Unauthorized",success:false})
    }
    next()
}