const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jwt = require('jsonwebtoken');
const { listPost } = require('./companyManagerController');

///[GET] http://localhost:5000/admin/jobpost
const listJobpost = async (req, res, next) =>{
    try {
        jobPostModel.find({})
        .then(listPost => {
         res.json(listPost)
        })
        .catch(next)
    } catch (error) {
        console.log(error)
    }
  }
///[GET] http://localhost:5000/admin/jobpost/details/:id
const details = async (req, res,next)=> {
    try {
        jobPostModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
    } catch (error) {
        console.log(error);
    }
}

///[GET] http://localhost:5000/admin/jobpost/:id
const update = (req, res, next) =>{
    try {
        jobPostModel.updateOne({_id: req.params.accId }, {verify: true})
            .then(() => res.status(200).json({
                success: true,
                message: "verify post success"
            }))
            .catch(next)
    } catch (error) {
        console.log(error)
    }
   
  }

const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await jobPostModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  }; 

module.exports ={
    listJobpost:listJobpost,
    update, update,
    details: details,
    Delete_many: Delete_many,

}