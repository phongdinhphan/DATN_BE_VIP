const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplicationModel')


///[GET] http://localhost:5000/company
const listPost = async (req, res, next) =>{
    jobPostModel.find({})
    .then(listpost => {
        // console.log(listpost)
        const a =  listpost?.filter((post) =>post?.namecompany === req.username) 
        res.json(a)

    })
    .catch(next) 
  
  }

const listCV = async (req, res, next) =>{
    jobApplicationModel.find({})
    .then(listpost => {
        // console.log(listpost)
        const a =  listpost?.filter((post) =>post?.namecompany === req.username) 
        res.json(a)

    })
    .catch(next) 
  
  }

  /// [GET] http://localhost:5000/company/details/:id
const detailsPost = (req, res, next) =>{
    jobPostModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
}

const detailsCV = (req, res, next) =>{
    jobApplicationModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
}

/// [POST] http://localhost:5000/company/create
const createCV = async(req,res, next) => {
     // get info user 
        const {benefit, expdate, gender, location, namecompany, title, required, salary, logo} = req.body;
        if(!benefit || !expdate || !gender || !location || !namecompany
            || !title || !required  || !salary){
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        } 

        const jobpost =   await  jobPostModel.create({
            benefit:benefit, 
            expdate:expdate, 
            gender:gender, 
            location:location, 
            namecompany:namecompany, 
            title:title, 
            required:required, 
            salary:salary, 
            logo: logo
        })
        return res.json({
            success: true,
            message: "create jobpost success",
            jobpost: jobpost
        })
     
     
}


  
module.exports = {
    listPost: listPost,
    listCV: listCV,
    createCV: createCV,
    detailsCV: detailsCV,
    detailsPost:detailsPost,
}

