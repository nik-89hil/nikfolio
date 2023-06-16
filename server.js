const express = require("express");
const app = express();
const PORT = 8080;
const ejs = require('ejs');
const subscription=[];
const fs = require("fs");
const checkDevePass = require('./middleware/checkDevePass')


app.use("/static",express.static("Public"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use("/admin",checkDevePass);



app.get("/",(req,res)=>{
    res.render("index",{
        subscriber:subscription.length +99
    })
})

app.post("/",(req,res)=>{
    const useremail = req.body.Subscription;
    const data = useremail + "\n"
    fs.appendFile('subscriber.txt',data, 'utf8',
	// callback function
	function(err) {		
		if (err) throw err;
		// if no error
		console.log("Data is appended to file successfully.")
});

    for(let i=0; i<=subscription.length; i++){
        if(useremail === subscription[i]){
            console.log("already subscribe")
            res.send("<a href='/'> "+useremail+" subscribed already !! . go to home.<a>")
            
        }
    }
    subscription[subscription.length] =  useremail;


    res.redirect("/")
})




// app.get("/admin",checkDevePass,(req,res)=>{
//     fs.readFile("./subscriber.txt","utf-8",(err,data)=>{
//         if(err){
//             return res.send("Error Happened sir.. in line 58 (server error)")
//         }
//         return res.send(data);
//     })

    // res.send("this is for developer thank YOu")

// })


// app.post("/admin",(req,res)=>{
//     if
//     res.end();
// })







app.listen(PORT,()=>{
    console.log("server started at ", PORT)
})