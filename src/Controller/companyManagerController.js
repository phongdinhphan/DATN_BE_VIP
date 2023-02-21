const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')

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
const showDetails = (req, res, next) =>{
    jobPostModel.findOne({_id: req.params.accId})
        .then(account => 
            res.json(account)
        )
        .catch(next)
}

/// [POST] http://localhost:5000/company/create
const createPost = async(req,res, next) => {
     // get info user 
        const {benifit, expdate, gender, location, namecompany, title, required, salary, logo} = req.body;
        if(!benifit || !expdate || !gender || !location || !namecompany
            || !title || !required  || !salary){
            return res.status(400).json({
                success: false,
                message: "missing"
            })
        } 

        const jobpost =   await  jobPostModel.create({
            benifit:benifit, 
            expdate:expdate, 
            gender:gender, 
            location:location, 
            namecompany:namecompany, 
            title:title, 
            required:required, 
            salary:salary, 
            logo: "null"
        })
        return res.json({
            success: true,
            message: "create jobpost success",
            jobpost: jobpost
        })
     
     
}

  /// [PUT] http://localhost:5000/company/details/:id
const update = (req, res, next) =>{
    jobPostModel.updateOne({_id: req.params.accId }, req.body)
      .then(() => res.json(req.body))
      .catch(next)
  }
  /// [DELETE]  http://localhost:5000/company/:id
const Delete = (req, res, next) =>{ 
    jobPostModel.findByIdAndDelete({_id: req.params.accId }, req.body)
        .then(() => res.json({
            success: true,
            userDetele: req.body
        }))
        .catch(next)
}
  
module.exports = {
    listPost: listPost,
    listCV: listCV,
    showDetails: showDetails,
    createPost: createPost,
    update: update,
    Delete: Delete,
}

