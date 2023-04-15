const express = require('express')
const router = express.Router()
const companyModel = require('../Models/companyModel')
const accountModel = require('../Models/accountModel')

///[GET] http://localhost:5000/admin/Company
const listCompany = async (req, res, next) =>{
    companyModel.find({})
      .then(listCompany => {
       res.json(listCompany)
      })
      .catch(next)
  
  }

  /// [GET] http://localhost:5000/admin/Company/details/:id
const showDetails = (req, res, next) =>{
    try {
        companyModel.findOne({_id: req.params.accId})
            .then(Company => 
                res.json(Company)
            )
            .catch(next)
    } catch (error) {
        console.log(error)
    }

}

/// [POST] http://localhost:5000/admin/Company/create
const createCompany = async(req,res) => {
    try {
           // get info user 
           const {namecompany, emailcompany,websitecompany  ,  phonecompany} = req.body;
           if(!namecompany || !emailcompany || !websitecompany || !phonecompany){
               return res.status(400).json({
                   success: false,
                   message: "missing"
               })
           } 
           const checkEmail = await companyModel.findOne({emailcompany})
           if(checkEmail){
               return res.status(400).json({
                   success: false,
                   message: "email already"
               })
           }   
   
           const checkPhoneNumber = await companyModel.findOne({phonecompany})
           if(checkPhoneNumber){
           return res.status(400).json({
               success: false,
               message: "phone number already"
           })
           }  
   
           const company =   await  companyModel.create({
               namecompany: namecompany, 
               emailcompany:emailcompany,
               websitecompany: (websitecompany.startsWith('https://')? websitecompany : `https://${websitecompany}`) || '',  
               phonecompany: phonecompany
           })

           return res.json({
               success: true,
               message: "create user success",
               Company: company
           })
    } catch (error) {
        console.log(error)
    }
  
}

  /// [PUT] http://localhost:5000/admin/Company/details/:id
const update = (req, res, next) =>{
    try {
        companyModel.updateOne({_id: req.params.accId }, req.body)
        .then(() => res.json(req.body))
        .catch(next)
    } catch (error) {
        console.log(error)
    }
}  

  /// [DELETE]  http://localhost:5000/admin/Company/:id
const Delete = (req, res, next) =>{ 
    try {
        companyModel.findByIdAndDelete({_id: req.params.accId }, req.body)
            .then(() => res.json({
                success: true,
                companyDetele: req.body
            }))
            .catch(next)
    } catch (error) {
        console.log(error)
    }

}

const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await companyModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };
  
module.exports = {
    listCompany: listCompany,
    showDetails: showDetails,
    createCompany: createCompany,
    update: update,
    Delete: Delete,
    Delete_many: Delete_many,
}