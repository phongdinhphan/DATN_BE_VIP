const express = require('express')
const router = express.Router()
const accountModel = require('../Models/accountModel')
const jwt = require('jsonwebtoken');
const companyModel = require('../Models/companyModel')
const schoolModel = require('../Models/schoolModel');
const studentModel = require('../Models/studentModel')



///[GET] http://localhost:5000/admin/account
const listUser = async (req, res, next) =>{
    try {
        accountModel.find({})
        .then(listuser => {
         res.json(listuser)
        })
        .catch(next)
    } catch (error) {
        console.log(error)
    }
  }
  /// [GET] http://localhost:5000/admin/account/details/:id
const showDetails = (req, res, next) =>{
    try {
        accountModel.findOne({_id: req.params.accId})
            .then(account => 
                res.json(account)
            )
            .catch(next)
    } catch (error) {
        console.log(error)
    }
    
}

/// [POST] http://localhost:5000/admin/account/create
const createAccount = async(req,res, next) => {
     // get info user 
     try {
        const {username, password , email, phonenumber, role} = req.body;
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
        const user =   await  accountModel.create({
            username: username,
            password: password ,
            email: email,
            phonenumber:phonenumber,
            role: role,
        })

        if(role == "Company"){
            const company = await companyModel.create({
                namecompany: username,
                emailcompany: email,
                phonecompany: phonenumber
            })
            company.save()
            return res.json({
                success: true,
                message: "create company success",
                company: company,
                user: user
            })
        }
        else if(role == "School"){
            const school = await schoolModel.create({
                nameschool: username,
                emailschool: email,
                phoneschool: phonenumber
            })
            school.save()
            return res.json({
                success: true,
                message: "create company success",
                school: school,
                user: user
            })
        }

        else if(role == "Student"){
            const Student = await studentModel.create({
                studentname: username,
                studentemail: email,
                studentphone: phonenumber
            })
            Student.save()
            return res.json({
                success: true,
                message: "create company success",
                Student: Student,
                user: user
            })
        }
       
        user.save()
     
     } catch (error) {
         console.log(error)
     }
       
     
}

  /// [PUT] http://localhost:5000/admin/account/details/:id
const update = (req, res, next) =>{
    try {
        accountModel.updateOne({_id: req.params.accId }, req.body)
            .then(() => res.json(req.body))
            .catch(next)
    } catch (error) {
        console.log(error)
    }
   
  }
  /// [DELETE]  http://localhost:5000/admin/account/:id
const Delete = async (req, res, next) =>{ 

    try {
        accountModel.findByIdAndDelete({_id: req.params.accId }, req.body)
            .then(() => res.json({
                success: true,
                userDetele: req.body
            }))
            .catch(next)
    } catch (error) {
        console.log(error)
    }
    
}


// Đường dẫn API để xóa bài đăng
const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await accountModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };
  
module.exports = {
    listUser: listUser,
    showDetails: showDetails,
    createAccount: createAccount,
    update: update,
    Delete: Delete,
    Delete_many: Delete_many,
}