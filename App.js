const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const fileupload = require('express-fileupload')

const adminRouter = require('./src/Router/adminRoute')
const authRouter = require('./src/Router/authRoute')
const universityRouter = require('./src/Router/universityRoute')
const companyRouter = require('./src/Router/companyRoute')
const studentRouter = require('./src/Router/studentRoute')

const connectDB =require("./src/Services/ConnectDB")
require('dotenv').config()

// middleware apply cors add all request
app.use(cors())
// midlewaer get info user to req.body
app.use(express.json())


//connect db
connectDB()

//fileup load
app.use(fileupload({
    createParentPath:true
}))

// config route
app.use('/', studentRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/uni', universityRouter)
app.use('/company', companyRouter)

app.listen(process.env.Port,function(){
    console.log(`server is running in localhost:${process.env.Port}`)
})