const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const jwt = require('jsonwebtoken');


///[GET] http://localhost:5000/admin/account
const listUser = async (req, res, next) =>{
    accountModel.find({})
      .then(listuser => {
       res.json(listuser)
      })
      .catch(next)
  
  }

const showDetails = (req, res, next) =>{
    userModel.findOne({_id: req.params.accId})
        .then(account => 
        res.json(account)
        )
        .catch(next)
}
const createAccount = async(req,res, next) => {
     // get info user 
        const {username, password,confpassword , email, phonenumber, role} = req.body;
        if(!email || !password || !username || !phonenumber || !role){
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        } 
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

        const user =   await  accountModel.create({
            username: username,
            password: password ,
            email: email,
            phonenumber:phonenumber,
            role: role,
        })
        return res.json({
            success: true,
            message: "create user success",
            user
        })
     
     
}
  
module.exports = {
    listUser: listUser,
    showDetails: showDetails,
    createAccount: createAccount
}