const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')


const adminRouter = require('./src/Router/adminRoute')
const authRouter = require('./src/Router/authRoute')
const universityRouter = require('./src/Router/universityRoute')
const companyRouter = require('./src/Router/companyRoute')
const studentRouter = require('./src/Router/studentRoute')
const upload = require('./src/Middleware/multer')
const bodyParser = require('body-parser')

const connectDB =require("./src/Services/ConnectDB");
const { log } = require('console');
require('dotenv').config()

// 

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())





// middleware apply cors add all request
app.use(cors())
// midlewaer get info user to req.body
app.use(express.json())


//connect db
connectDB()

//fileup load




// config route
app.post("/single",upload.single("image"), (req,res)=> {
    console.log(req.file);
    res.send("success")
})

app.use('/', studentRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/uni', universityRouter)
app.use('/company', companyRouter)

app.listen(process.env.Port,function(){
    console.log(`server is running in localhost:${process.env.Port}`)
})