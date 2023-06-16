const PasswordFirst = 9625696396;
const PasswordSecond = "nikhilkumar";


const checkDevePass = function (req, res , next){
    if(req.body){
        if(req.body.passwordFirst == PasswordFirst){
            if(req.body.passwordSecond == PasswordSecond){
                next();
  
            }
        }
    }else{
       return res.redirect("/");

    }
   
}

module.exports = checkDevePass;