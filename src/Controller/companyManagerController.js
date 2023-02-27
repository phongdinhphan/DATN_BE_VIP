const express = require('express')
const router = express.Router()
const jobPostModel = require('../Models/jobPostModel')
const jobApplicationModel = require('../Models/jobApplication')
const fileUpload = require("express-fileupload")
const app = express()

app.use(fileUpload({
  createParentPath: true
}))
const { format } = require('date-fns');

// const date = new Date();
// const formattedDate = format(date, 'dd/MM/yyyy');

///[GET] http://localhost:5000/company
const listPost = async (req, res, next) =>{
    try {
        jobPostModel.find({})
        .then(listpost => {
            // console.log(listpost)
            const a = listpost?.filter((post) => {
                const regex = new RegExp(req.username, 'i');
                return post?.namecompany && regex.test(post.namecompany);
              });
            res.json(a)
    
        })
        .catch(next) 
    } catch (error) {
        console.log(error);
    }
}

const listCV = async (req, res, next) =>{
    try {
        jobApplicationModel.find({})
        .then(listpost => {
            // console.log(listpost)
            const a =  listpost?.filter((post) =>post?.namecompany === req.username) 
            res.json(a)
    
        })
        .catch(next) 
      
    } catch (error) {
        console.log(error);
    }
   
  }

  /// [GET] http://localhost:5000/company/details/:id
const showDetails = (req, res, next) =>{
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

/// [POST] http://localhost:5000/company/create
const createPost = async(req,res, next) => {
    try {
            // get info user 
            const {benifit, expdate, gender, location, namecompany, title, required, salary} = req.body;
            const logo = req.files
            if(!benifit || !expdate || !gender || !location || !namecompany
                || !title || !required  || !salary ){
                return res.status(400).json({
                    success: false,
                    message: "missing"
                })
            }  

            console.log(logo)

            logo.mv("./uploads/" + logo.name)

            const jobpost =   await  jobPostModel.create({
                benifit:benifit, 
                expdate:expdate, 
                gender:gender, 
                location:location, 
                namecompany:namecompany, 
                title:title, 
                required:required, 
                salary:salary, 
                logo: logo.name,
            })
            return res.json({
                success: true,
                message: "create jobpost success",
                jobpost: jobpost
            })
    } catch (error) {
        console.log(error);
    }    
}

  /// [PUT] http://localhost:5000/company/details/:id
const update = (req, res, next) =>{
    try {
        jobPostModel.updateOne({_id: req.params.accId }, req.body)
            .then(() => res.json(req.body))
            .catch(next)
    } catch (error) {
        console.log(error);
    }
    
  }
  /// [DELETE]  http://localhost:5000/company/:id
const Delete = (req, res, next) =>{ 
    try {
        jobPostModel.findByIdAndDelete({_id: req.params.accId }, req.body)
            .then(() => res.json({
                success: true,
                userDetele: req.body
            }))
            .catch(next)
    } catch (error) {
        console.log(error);
    }

}
  
module.exports = {
    listPost: listPost,
    listCV: listCV,
    showDetails: showDetails,
    createPost: createPost,
    update: update,
    Delete: Delete,
}

