const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const studentModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
require("dotenv").config()
const mailgen = require('mailgen')



///{POST} http://localhost:5000/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, password, confpassword, email, phonenumber, academicyear, school } = req.body;

        const config = {
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EmailSend,
                pass: process.env.AUTH_Pass,
            }
        }
        let transporter = nodemailer.createTransport(config)

        let mailGenarator = new mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: "http://mailgen.js/"
            }
        })
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        let response = {
            body: {
                name: "verify your email",
                intro: " verify your email",
                table: {
                    data: {
                        item:`<h2> ${username}! Thanks for register on our site </h2>
                            <h4>Please verify your email to contine wiht ${otp}</h4>
                             `
                    }
                },
                outro: " Check your mail"
            }
        }

       


        if (!email || !password || !username || !phonenumber) {
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }

        const checkEmail = await accountModel.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "email already"
            })
        }

        let mail = mailGenarator.generate(response)

        let messageSend = {
            from: process.env.AUTH_EmailSend,
            to: email,
            subject: "Mail from ICN verify register",
            html: mail
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
            school: school,
            verify: false
        })

        transporter.sendMail((messageSend),(req,res)=>{
            try {
                then(() => {
                    return res.status(201).json({
                        success: true,
                        message: "you verified email"
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                
            }
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


router.post('/reset-password', async (req, res) => {
    const { newpassword, confpassword, email } = req.body;
    if (!email || !newpassword || !confpassword) {
        return res.status(400).json({
            success: false,
            message: "missing"
        })
    }
    try {
        const check = await accountModel.findOneAndUpdate({ email: email }, { password: newpassword })

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

