/*
 * all modules are intialized here
 */
const express=require("express");
const mongoose = require("mongoose");
const helmet=require("helmet");
const morgan=require("morgan");
const dotenv=require("dotenv");
const cors = require('cors');
const multer = require("multer");// this is used to upload file to server
const path = require("path")

const app=express();
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");

app.use(cors())
dotenv.config();

/* Connection to MongoDB */
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.log("not Connected to MongoDB");
});

app.use("/images",express.static(path.join(__dirname,"public/images")));

/* Middleware */
app.use(express.json());// when you make post request it simply gonna parser it

app.use(helmet());

app.use(morgan("common"));// Morgan is another HTTP request logger middleware for Node. js. It simplifies the process of logging requests to your application.

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
})
const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully.");
    }catch(err){
        console.log(err);
    }
})

app.use("/api/users",userRoute);// when ever we over this address this will run userRoute(i.e a router check user.js file  inside routers file)
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

// app.get("/",(req,res)=>{
//     res.send("welcome to home page");
// })

// app.get("/auth",(req,res)=>{
//     res.send("welcome to auth page");
// })

// app.get("/users",(req,res)=>{
//     res.send("welcome to users page");
// })

app.listen(8800,()=>{
    console.log("this is running successfully");
})