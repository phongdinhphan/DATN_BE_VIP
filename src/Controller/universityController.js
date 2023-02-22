const express = require('express')
const router = express.Router()
const universitytModel = require('../Models/studentModel')
const jwt = require('jsonwebtoken');

const listStudent = async (req, res, next) =>{
    try {
        universitytModel.find({})
        .then(liststudent => {
            // console.log(listpost)
            const a =  liststudent?.filter((student) =>student?.school === req.username) 
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

module.exports = {
    listStudent: listStudent,
    detailsStudent: detailsStudent,
    updateStudent: updateStudent,
}
