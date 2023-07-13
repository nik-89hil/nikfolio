const express = require("express");
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken')
const {getConnection} = require('../utility/database');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');
const {authorization} = require('../middleware/authorization')


router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../Public/admin.html"))
    
})

router.post("/",async(req,res)=>{
    const pss = req.body.passwordAdmin
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const adminfound = await collection.findOne({adminemail:req.body.adminemail});
    // console.log(adminfound)
    if(adminfound.adminemail === req.body.adminemail){
        if(adminfound.adminName === req.body.adminName){
            const comparepass = await bcrypt.compare(pss,adminfound.pssHash)
            // console.log(comparepass)
            if(comparepass){
                const token = jwt.sign({
                    adminemail:adminfound.adminemail,
                    adminName:adminfound.adminName,
                    role:adminfound.role
                },process.env.MY_JWT_SECRET, { expiresIn: '1h' })
                res.cookie("token",token);
                // res.redirect("/admin/verified")
                // res.send("<a href='/admin/verified'>go next</a>")
                res.send("<button><a href='/admin/verified'>Check subscribers</a></button>")
                res.end();
                return

            }

        }
    }

    res.send("unauthorized access");
    // res.redirect("/")
    res.end();

    

})



router.get("/verified",authenticate ,authorization("admin"), async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findresult = await collection.find({}).toArray();
    res.render("admin-set",{
        array:findresult
    })

    client.close();
    res.end();
})


router.get("/verified/message",authenticate ,authorization("admin"), async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("work");
    const findresult = await collection.find({}).toArray();
    res.render("adminMessage",{
        array:findresult
    })

    client.close();
    res.end();
})

module.exports = router ;