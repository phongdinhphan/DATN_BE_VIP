const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')

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
    showDetails: showDetails,
    createPost: createPost,
    update: update,
    Delete: Delete,
}

