const express = require('express')
const router = express.Router()
const universitytModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');
const schoolModel = require('../Models/schoolModel')
const accountModel = require('../Models/accountModel')


const listStudent = async (req, res, next) =>{
    try {
        universitytModel.find({})
        .then(liststudent => {
            // console.log(listpost)
            const a = liststudent?.filter((student) => {
                const regex = new RegExp(req.username, 'i');
                return student?.school && regex.test(student.school);
              });
            res.json(a)
    
        })
        .catch(next) 
    } catch (error) {
        console.log(error)
    }

}


const detailsStudent = async (req, res, next) =>{
    try {
        universitytModel.findOne({_id: req.params.accId})
        .then(student => 
            res.json(student)
        )
        .catch(next)
    } catch (error) {
        console.log(error)
    }

}

const updateStudent = (req, res, next) =>{
    try {
        universitytModel.updateOne({_id: req.params.accId }, req.body)
        .then(() => res.json(req.body))
        .catch(next)
    } catch (error) {
        console.log(error)
    }
  }


const update_profile = async (req, res, next) => {
    try {
         const b = await accountModel.findOneAndUpdate({email: req.email},{
                username: req.body.nameschool,
                phonenumber: req.body.phoneschool,
        })
        const a = await schoolModel.findOneAndUpdate({ emailschool: req.email}, {
            nameschool: req.body.nameschool,
            phonenumber:req.body.phonenumber,
            websiteschool: req.body.websiteschool,
            
        })    
        res.json({
            success: true,
            message:"update profile success",
            profile: req.body
        })
        await a.save()
        await b.save()

    } catch (error) {
        console.log(error);
    }

}

const profile = (req, res, next) => {
    try {
        schoolModel.findOne({ emailschool: req.email })
            .then((profile) => {
                res.json({
                    success: true,
                    profile: profile
                })
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }

} 
module.exports = {
    listStudent: listStudent,
    detailsStudent: detailsStudent,
    updateStudent: updateStudent,
    update_profile: update_profile,
    profile: profile,
}
