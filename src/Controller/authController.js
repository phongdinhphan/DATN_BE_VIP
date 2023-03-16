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
        const { username, password, confpassword, email, phonenumber, school ,gender} = req.body;

        const tranforter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.AUTH_EmailSend,
                pass: process.env.AUTH_Pass,
            }
        })

        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        const mailOptions = {
            from: process.env.AUTH_EmailSend,
            to: email,
            subject: `Message from ${email}: Veriy email`,
            text: 'thanks for register' ,
            html: `<div>
                    <h1>Email Confirmation</h1>
                    <h2>Hello ${username}! Thanks for register on our site </h2>
                    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                    <h4>Please verify your email to contine</h4>
                    <a href=http://localhost:5000/auth/confirm/${email}> Click here</a>
                </div>` ,
        }
      
        tranforter.sendMail(mailOptions,(error,info)=> {
            if(error){
                console.log(error);
            }
            else{
                console.log("email sent " + info.response)
            }
        })

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
            gender:gender,
            role: 'Student',
            verified: false
        })
        const student = await studentModel.create({
            studentModel: username,
            studentemail: email,
            studentphone: phonenumber,
            school: school,
            gender:gender,
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

router.get("/confirm/:email", async  (req, res)=> {
    try {
        accountModel.findOneAndUpdate({email: req.params.email},{verified: true})
            .then(account => {
                if(!account){
                    return res.status(404).send({ message: "User Not found." });
                }
                res.json({
                    success: true,
                    message: "verified success",
                   
                })

            })
            .catch(console.error())
    } catch (error) {
        console.log(error)
    }
})
module.exports = router

