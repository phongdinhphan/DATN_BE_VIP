const express = require('express')
const router = express.Router()
const majorModel = require('../Models/majorModel')


const listMajor = async (req, res, next) =>{
    majorModel.find({})
      .then(listMajor => {
       res.json(listMajor)
      })
      .catch(next)
  
  }

  /// [GET] http://localhost:5000/admin/Major/details/:id
const showDetails = (req, res, next) =>{
    majorModel.findOne({_id: req.params.accId})
        .then(Major => 
            res.json(Major)
        )
        .catch(next)
}

/// [POST] http://localhost:5000/admin/Major/create
const createMajor = async(req,res) => {
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
     
     
}

  /// [PUT] http://localhost:5000/admin/Company/details/:id
const update = (req, res, next) =>{
    majorModel.updateOne({_id: req.params.accId }, req.body)
      .then(() => res.json(req.body))
      .catch(next)
  }
  /// [DELETE]  http://localhost:5000/admin/Company/:id
const Delete = (req, res, next) =>{ 
    majorModel.findByIdAndDelete({_id: req.params.accId }, req.body)
        .then(() => res.json({
            success: true,
            majorDetele: req.body
        }))
        .catch(next)
}
  
module.exports = {
    listMajor: listMajor,
    showDetails: showDetails,
    createMajor: createMajor,
    update: update,
    Delete: Delete,
}