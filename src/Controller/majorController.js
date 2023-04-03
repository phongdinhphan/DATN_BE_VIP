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
           const {namemajor} = req.body;
           if(!namemajor){
               return res.status(400).json({
                   success: false,
                   message: "missing"
               })
           }     
           const Major =   await  majorModel.create({
               namemajor: namemajor,
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

const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await majorModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };
  
module.exports = {
    listMajor: listMajor,
    showDetails: showDetails,
    createMajor: createMajor,
    update: update,
    Delete: Delete,
    Delete_many: Delete_many,
}