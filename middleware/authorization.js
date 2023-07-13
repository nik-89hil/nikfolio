function authorization(role){
    return function (req,res,next){
        // console.log("---",role,res.locals.authInfo)
        if(role !== res.locals.authInfo.role){
            res.json({
                message:"you have not access this route"
            })
            res.end();
            return
        }
        next();
    }
}


module.exports = {
    authorization
}