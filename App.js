const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const adminRouter = require('./src/Router/adminRoute')
const authRouter = require('./src/Router/authRoute')

const connectDB =require("./src/Services/ConnectDB")
require('dotenv').config()

// middleware apply cors add all request
app.use(cors())
// midlewaer get info user to req.body
app.use(express.json())


//connect db
connectDB()


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/admin', adminRouter)
app.use('/auth', authRouter)

app.listen(process.env.Port,function(){
    console.log(`server is running in localhost:${process.env.Port}`)
})