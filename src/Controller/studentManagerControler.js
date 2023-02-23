const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')


///[GET] http://localhost:5000/company
const listPost = async (req, res, next) =>{
    try {
        jobApplicationModel.find({})
        .then(listpost => {
            // console.log(listpost)
            const a =  listpost?.filter((post) =>post?.email === req.email) 
            console.log(a)
    
        })
        .catch(next) 
      }
    catch (error) {
        console.log(error)
    }
}

const listCV = async (req, res, next) =>{
    try {
        jobApplicationModel.find({})
        .then(listapp => {
            //console.log(listapp)
            const a =  listapp?.filter((app) =>app?.email === req.email) 
            console.log(a)
    
        })
        .catch(next) 
    } catch (error) {
        console.log(error)
        
    }
 
  
  }

  /// [GET] http://localhost:5000/company/details/:id
const detailsPost = (req, res, next) =>{
    try {
        jobPostModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
    } catch (error) {
        console.log(error)
        
    }
   
}

const detailsCV = (req, res, next) =>{
    try {
        jobApplicationModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
    } catch (error) {
        console.log(error)
        
    }
  
}

/// [POST] http://localhost:5000/company/create
const createCV = async(req,res, next) => {
    try {
            // get info user 
            const {date, name, major, email, namecompany, nameschool, status, url, verify} = req.body;
            if(!date || !name || !major || !email || !namecompany
                || !nameschool || !url ){
                return res.status(400).json({
                    success: false,
                    message: "missing"
                })
            } 
            const jobaplli =   await  jobApplicationModel.create({
                date: date, 
                name:  name, 
                major:  major,
                email: email, 
                namecompany: namecompany, 
                nameschool: nameschool, 
                status: "Đang chờ xác nhận", 
                url: url, 
                verify: false
            })
            return res.json({
                success: true,
                message: "create jobpost success",
                jobaplli: jobaplli
            })
    } catch (error) {
        console.log(error)     
    }   
}

const upload = async (req, res) => {
    try {
        if(!req.url){
            res.send({
                status: false,
                message: "no files"
            })
        }
        else{
            const{url} = req.body.url
            url.mv("./uploads" + url.name)
            res.send({
                status: true,
                message: "Files is uploaded"
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

  
module.exports = {
    listPost: listPost,
    listCV: listCV,
    createCV: createCV,
    detailsCV: detailsCV,
    detailsPost:detailsPost,
    upload: upload
}

