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

module.exports ={
    listJobpost:listJobpost,
    update, update,
    details: details

}