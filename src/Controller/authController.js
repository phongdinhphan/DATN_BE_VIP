const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const jwt = require('jsonwebtoken');

 ///{POST} http://localhost:5000/auth/register
router.post('/register', async (req, res) => {
 
        // get info user 
        const {username, password,confpassword , email, phonenumber} = req.body;
        if(!email || !password || !username || !phonenumber){
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        }   
        try {
         const checkEmail = await accountModel.findOne({email})
         if(checkEmail){
            return res.status(400).json({
                success: false,
                message: "email already"
            })
        }   

        const checkPhoneNumber = await accountModel.findOne({phonenumber})
        if(checkPhoneNumber){
           return res.status(400).json({
               success: false,
               message: "phone number already"
           })
       }  

       if(confpassword !=password){
        return res.status(400).json({
            success: false,
            message: "confirm password incorrect"
        })
       }
        // create collection
            //const hashPassword = bscrypt.hashSync(password, SALT_ROUNDS);
            const user =   await  accountModel.create({
            username: username,
            password: password ,
            email: email,
            phonenumber:phonenumber,
            role: 'Student',
        })
        return res.json({
            success: true,
            message: "register success",
            user
        })
       
        } catch (error) {
            console.log("error", error)
        }
})




 ///{POST} http://localhost:5000/auth/login
 router.post('/login', async (req, res) => {
 
    // get info user 
    const {password, email} = req.body;
    if(!email || !password ){
        return res.status(400).json({
            success: false,
            message: "missing"
        })
    }   
    try {
     const check = await accountModel.findOne({email:email,password: password})

        if(!check){
            return res.status(400).json({
                success: false,
                message: "email encorrect"
            })
            
        }   
        else if(!check){
            return res.status(400).json({
                success: false,
                message: "password encorrect"
            })
        }  
        else{
            const token = jwt.sign({
                id:check.id,
                username: check.username,
                role: check.role
            },process.env.SecretJwt,{
                expiresIn: "10m"
            })
        
            return res.status(200).json({
                success: true,
                token: {
                    accessToken: token,
                    refeshToken: {}
                },
                User: check
            })
        }
    } catch (error) {
        console.log("error", error)
    }
})

module.exports= router

