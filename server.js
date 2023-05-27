const express = require("express");
const app = express();
const PORT = 8080;
const ejs = require('ejs');



app.use("/static",express.static("Public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index")
})





app.listen(PORT,()=>{
    console.log("server started at ", PORT)
})