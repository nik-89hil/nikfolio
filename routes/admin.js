const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.render("my_admin",{})
})

router.get("/verified",(req,res)=>{
    res.json({
        message:"verified"
    })
})

module.exports = router ;