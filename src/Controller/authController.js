const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const studentModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');

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

// nhánh này được clone từ main: nghĩa là hiện tại code ở đây giống nhánh main và là mới nhất
// Oke:sơ sơ :() mà ổn nha anh vip quá
// save
// bên kia là data mình clone bên đây là data mình change file nào change thì nó hiện 1 thay đổi

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

module.exports = router

