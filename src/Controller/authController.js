const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const studentModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { v4: uuidv4 }= require ('uuid');
const crypto = require('crypto');
require("dotenv").config()

//handle send email
// const token = crypto.randomBytes(20).toString('hex');
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your_email_address@gmail.com',
//       pass: 'your_email_password'
//     }
//   });

// transporter.verify((error,succcess)=>{
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("success")
//         console.log(succcess)

//     }
// })

// const sendVerificationEmail = ({_id, email}, res) => {
//     // const currentURL = "http://localhost:5000/"
//     // const  uniqueString = uuidv4() + _id
//     const mailOption ={
//         form: process.env.AUTH_EmailSend,
//         to: email,
//         subject: 'Email Verification',
//         html: `Click <a href="http://localhost:3000/verify/${token}">here</a> to verify your email.`
//     }
// }


///{POST} http://localhost:5000/auth/register
router.post('/register', async (req, res) => {

    // get info user 
    const { username, password, confpassword, email, phonenumber, academicyear, address, code, gender, major, school } = req.body;
    if (!email || !password || !username || !phonenumber) {
        return res.status(400).json({
            success: false,
            message: "missing"
        })
    }
    try {
        const checkEmail = await accountModel.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "email already"
            })
        }

        const checkPhoneNumber = await accountModel.findOne({ phonenumber })
        if (checkPhoneNumber) {
            return res.status(400).json({
                success: false,
                message: "phone number already"
            })
        }

        if (confpassword != password) {
            return res.status(400).json({
                success: false,
                message: "confirm password incorrect"
            })
        }
        // create collection
        //const hashPassword = bscrypt.hashSync(password, SALT_ROUNDS);
        const user = await accountModel.create({
            username: username,
            password: password,
            email: email,
            phonenumber: phonenumber,
            role: 'Student',
            verified: false
        })
        const student = await studentModel.create({
            studentModel: username,
            studentemail: email,
            studentphone: phonenumber,
            academicyear: academicyear,
            address: address,
            code: code,
            gender: gender,
            major: major,
            school: school,
            verify: false
        })
        return res.status(200).json({
            success: true,
            message: "register success",
            user: user,
            student: student
        })

    } catch (error) {
        console.log("error", error)
    }
})



///{POST} http://localhost:5000/auth/login
router.post('/login', async (req, res) => {

    // get info user 
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "missing"
        })
    }
    try {
        const check = await accountModel.findOne({ email: email, password: password })

        if (!check) {
            return res.status(400).json({
                success: false,
                message: "email encorrect"
            })

        }
        else if (!check) {
            return res.status(400).json({
                success: false,
                message: "password encorrect"
            })
        }
        else {
            const token = jwt.sign({
                id: check.id,
                username: check.username,
                email: check.email,
                role: check.role
            }, process.env.SecretJwt, {
                expiresIn: "1d"
            })

            const refeshToken = jwt.sign({
                id: check.id,
                username: check.username,
                role: check.role
            }, process.env.SecretRefestJwt, {
                expiresIn: "10m"
            })

            return res.status(200).json({
                success: true,
                token: {
                    accessToken: token,
                    refeshToken: refeshToken
                },
                User: check
            })
        }
    } catch (error) {
        console.log("error", error)
    }
})


router.post('/reset-password', async (req, res) =>{
    const { newpassword, confpassword,email } = req.body;
    if (!email || !newpassword || !confpassword) {
        return res.status(400).json({
            success: false,
            message: "missing"
        })
    }
    try {
        const check = await accountModel.findOneAndUpdate({ email: email }, {password: newpassword})

        if (!check) {
            return res.status(400).json({
                success: false,
                message: "email encorrect"
            })
        }

        if (confpassword != newpassword) {
            return res.status(400).json({
                success: false,
                message: "confirm password incorrect"
            })
        }


        return res.status(200).json({
            success: true,
            User: check,
            
        })
    } catch (error) {
        console.log("error", error)
    }



})
module.exports = router

