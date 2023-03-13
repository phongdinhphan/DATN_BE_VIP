const express = require('express')
const router = express.Router()
const skillModel = require('../Models/skillModel')


const listSkill = async (req, res, next) =>{
    try {
        skillModel.find({})
            .then(listskill => {
            res.json(listskill)
            })
            .catch(next)
    } catch (error) {
        console.log(error);
    }
  }

  /// [GET] http://localhost:5000/admin/skill/details/:id
const showDetails = (req, res, next) =>{

    try {
        skillModel.findOne({_id: req.params.accId})
            .then(skill => 
                res.json(skill)
            )
            .catch(next)
    } catch (error) {
        console.log(error)
    }

}

/// [POST] http://localhost:5000/admin/skill/create
const createSkill = async(req,res) => {
    try {
           // get info user 
           const {nameskill} = req.body;
           if(!nameskill){
               return res.status(400).json({
                   success: false,
                   message: "missing"
               })
           }     
           const skill =   await  skillModel.create({
               nameskill: nameskill,
           })
           return res.json({
               success: true,
               message: "create skill success",
               skill: skill
           })
    } catch (error) {
        console.log(error)
    }   
}
  /// [PUT] http://localhost:5000/admin/skill/details/:id
const update = (req, res, next) =>{
    try {
        skillModel.updateOne({_id: req.params.accId }, req.body)
        .then(() => res.json(req.body))
        .catch(next)
    } catch (error) {
        console.log(error)
    }
}
  /// [DELETE]  http://localhost:5000/admin/skill/:id
const Delete = (req, res, next) =>{ 
    try {
        skillModel.findByIdAndDelete({_id: req.params.accId }, req.body)
        .then(() => res.json({
            success: true,
            skillDetele: req.body
        }))
        .catch(next)
    } catch (error) {
        console.log(error)
    }

}
  
module.exports = {
    listSkill: listSkill,
    showDetails: showDetails,
    createSkill: createSkill,
    update: update,
    Delete: Delete,
}