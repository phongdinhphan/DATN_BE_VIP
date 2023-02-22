const express = require('express')
const router = express.Router()
const majorModel = require('../Models/majorModel')


const listMajor = async (req, res, next) =>{
    try {
        majorModel.find({})
            .then(listMajor => {
            res.json(listMajor)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
  }

  /// [GET] http://localhost:5000/admin/Major/details/:id
const showDetails = (req, res, next) =>{

    try {
        majorModel.findOne({_id: req.params.accId})
            .then(Major => 
                res.json(Major)
            )
            .catch(next)
    } catch (error) {
        console.log(error)
    }

}

/// [POST] http://localhost:5000/admin/Major/create
const createMajor = async(req,res) => {
    try {
           // get info user 
           const {nameMajor} = req.body;
           if(!nameMajor){
               return res.status(400).json({
                   success: false,
                   message: "missing"
               })
           }     
           const Major =   await  majorModel.create({
               namemajor: nameMajor,
           })
           return res.json({
               success: true,
               message: "create major success",
               Major: Major
           })
    } catch (error) {
        console.log(error)
    }   
}
  /// [PUT] http://localhost:5000/admin/Company/details/:id
const update = (req, res, next) =>{
    try {
        majorModel.updateOne({_id: req.params.accId }, req.body)
        .then(() => res.json(req.body))
        .catch(next)
    } catch (error) {
        console.log(error)
    }
}
  /// [DELETE]  http://localhost:5000/admin/Company/:id
const Delete = (req, res, next) =>{ 
    try {
        majorModel.findByIdAndDelete({_id: req.params.accId }, req.body)
        .then(() => res.json({
            success: true,
            majorDetele: req.body
        }))
        .catch(next)
    } catch (error) {
        console.log(error)
    }

}
  
module.exports = {
    listMajor: listMajor,
    showDetails: showDetails,
    createMajor: createMajor,
    update: update,
    Delete: Delete,
}