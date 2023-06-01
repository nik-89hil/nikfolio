const express = require("express");
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const subscription=[];


app.use("/static",express.static("Public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.render("index",{
        subscriber:subscription.length +99
    })
})

app.post("/",(req,res)=>{
    const useremail = req.body.Subscription;
    for(let i=0; i<=subscription.length; i++){
        if(useremail === subscription[i]){
            console.log("already subscribe")
            res.send("<a href='/'> "+useremail+" subscribed already !! . go to home.<a>")
            
        }
    }
    subscription[subscription.length] =  useremail;
    res.redirect("/")
    
   
    
})




app.listen(PORT,()=>{
    console.log("server started at ", PORT)
})