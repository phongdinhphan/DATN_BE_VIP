const express = require('express')
const router = express.Router()
const universitytModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');

const listStudent = async (req, res, next) =>{
    universitytModel.find()
        .then(listuser => {
            // console.log(req.role)
            const a =  listuser?.filter((student) =>student?.school === req.username).map((item)=>item)
           res.json(a)

        })
        .catch(next) 
}


const detailsStudent = async (req, res, next) =>{
    universitytModel.findOne({_id: req.params.accId})
        .then(student => 
            res.json(student)
        )
        .catch(next)
}

const updateStudent = async (req, res, next) =>{
    universitytModel.updateOne({_id: req.params.accId }, req.body)
    console.log(req.body)
    //   .then(() => res.status(200).json({
    //     success: true,
    //     body: req.body
    //   }))
    //   .catch(next)
}

module.exports = {
    listStudent: listStudent,
    detailsStudent: detailsStudent,
    updateStudent: updateStudent,
}
