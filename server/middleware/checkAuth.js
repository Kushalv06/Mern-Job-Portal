export function checkAuth(req, res, next) {
    console.log(req.session.userId)
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    next();
}