const express = require("express");
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const adminRouter = require('./routes/admin');
const {getConnection} = require("./utility/database")




app.use(express.urlencoded({extended:true}));
app.use(express.json());
require("dotenv").config();
app.use(cookieParser());
app.use("/static",express.static("Public"));
app.set("view engine","ejs");

app.use("/admin",adminRouter);

//home route

app.get("/",async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findResult = await collection.countDocuments();
    // console.log(findResult);
    res.render("index",{
        subscriber:findResult
    })
})

app.post("/",async(req,res)=>{
    const user = req.body.subscriberEmail;
    // console.log(user)

    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const filteredDocs = await collection.find({subscriberEmail: user}).toArray();
    // console.log(filteredDocs.length,"----")

    if(filteredDocs.length !== 0){
        res.send(`You already subcribed this website....<a href='/'>go to home</a>`);
        res.end();
        return 
    }

    await collection.insertOne({...req.body,role:"user"});
    res.redirect("/");
    res.end();
})

app.get("/skill-set",async(req,res)=>{
    // console.log(__dirname)
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findResult = await collection.countDocuments();

    res.render("skill-set",{
        subscriber:findResult
    })
})

app.get("/projects",async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findResult = await collection.countDocuments();
    res.render("projectOne",{
        subscriber:findResult
    })
})

app.get("/certification",async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findResult = await collection.countDocuments();
    res.render("certification",{
        subscriber:findResult

    })
})

// app.get("/about",(req,res)=>{
//     res.render("about_me",{})
// })

app.get("/contact-me",async(req,res)=>{
    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("subscribers");
    const findResult = await collection.countDocuments();
    res.render("contact",{
        subscriber:findResult
    })
})

app.post("/contact-me",async(req,res)=>{
    console.log(req.body)
    const user = req.body.useremail;
    // console.log(user)

    const client = getConnection();
    await client.connect();
    const collection = await client.db("nikfolio_db").collection("work");
    const filteredDocs = await collection.find({useremail: user}).toArray();
    // console.log(filteredDocs.length,"----")

    if(filteredDocs.length !== 0){
        res.send(`I will contact you soon....<a href='/'>go to home</a>`);
        res.end();
        return 
    }

    await collection.insertOne({...req.body});
    res.redirect("/");
    res.end();
})









app.get("*",(req,res)=>{
    res.send(`page not found \n  <a href='/'> go to home</a>`)
    res.end();
})

app.use((error,req,res,next)=>{
    // console.log(error?.message)
    if(error){
    res.json({success:false,message:"something unexpected happen report your problem at nikhilkumar19072002@gmail.com",eroors:error.message})
    }
    
})

app.listen(PORT,()=>{
    console.log("server started at ", PORT)
})