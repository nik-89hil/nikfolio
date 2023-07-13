const jwt = require("jsonwebtoken")


function authenticate(req, res, next) {
    // console.log(req.headers.authorization,"-----")

    const token = req.cookies.token

    if (!token) {
        res.json({
            message: "forbidden || you don't enter this route",
            success: false
        })
        res.end();
        return;
    }

    const resultoken = jwt.verify(token, process.env.MY_JWT_SECRET);
    const { adminemail,adminName, role } = resultoken;

    // console.log(resultoken);

    // console.log(resultoken)
    if (!resultoken) {
        res.json({
            sucess: false,
            message: "you dont have access"
        })
        res.end();
        return
    }
    res.locals.authInfo = { adminemail,adminName , role }
    next();
}

module.exports = authenticate