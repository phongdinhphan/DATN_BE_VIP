const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const studentModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
require("dotenv").config()




///{POST} http://localhost:5000/auth/register
router.post('/register', async (req, res) => {

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Success register with Us", // plain text body
        html: "<b>Success register with Us</b>", // html body
    }

    transporter.sendMail(message)
        .then((info) => {
            return res.status(201).json({
                message: "success",
                info: info.messageId,
                preview: nodemailer.getTestMessageUrl(info)
            })
        })
        .catch((error)=> {
            console.log(error);
        })
    // get info user 
    // const { username, password, confpassword, email, phonenumber, academicyear, school } = req.body;
    // if (!email || !password || !username || !phonenumber) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "missing"
    //     })
    // }
    // try {
    //     const checkEmail = await accountModel.findOne({ email })
    //     if (checkEmail) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "email already"
    //         })
    //     }

    //     const checkPhoneNumber = await accountModel.findOne({ phonenumber })
    //     if (checkPhoneNumber) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "phone number already"
    //         })
    //     }

    //     if (confpassword != password) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "confirm password incorrect"
    //         })
    //     }
    //     // create collection
    //     //const hashPassword = bscrypt.hashSync(password, SALT_ROUNDS);
    //     const user = await accountModel.create({
    //         username: username,
    //         password: password,
    //         email: email,
    //         phonenumber: phonenumber,
    //         role: 'Student',
    //         verified: false
    //     })
    //     const student = await studentModel.create({
    //         studentModel: username,
    //         studentemail: email,
    //         studentphone: phonenumber,
    //         academicyear: academicyear,
    //         school: school,
    //         verify: false
    //     })
    //     return res.status(200).json({
    //         success: true,
    //         message: "register success",
    //         user: user,
    //         student: student
    //     })

    // } catch (error) {
    //     console.log("error", error)
    // }
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

