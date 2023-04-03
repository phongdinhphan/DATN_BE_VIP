const express = require('express')
const router = express.Router()
const schoolModel = require('../Models/schoolModel')


///[GET] http://localhost:5000/admin/school
const listSchool = async (req, res, next) =>{
    try {
        
    } catch (error) {
        console.log(error)
    }

    schoolModel.find({})
      .then(listschool => {
       res.json(listschool)
      })
      .catch(next)
  
  }

  /// [GET] http://localhost:5000/admin/school/details/:id
const showDetails = (req, res, next) =>{
    try {
        schoolModel.findOne({_id: req.params.accId})
        .then(school => 
            res.json(school)
        )
        .catch(next)
    } catch (error) {
        console.log(error)
    }
   
}

/// [POST] http://localhost:5000/admin/school/create
const createschool = async(req,res) => {
    try {
          // get info user 
          const {nameschool, emailschool,websiteschool ,location ,  phoneschool} = req.body;
          if(!nameschool || !emailschool || !websiteschool || !phoneschool || !location){
              return res.status(400).json({
                  success: false,
                  message: "missing"
              })
          } 
          const checkEmail = await schoolModel.findOne({emailschool})
          if(checkEmail){
              return res.status(400).json({
                  success: false,
                  message: "email already"
              })
          }   
  
          const checkPhoneNumber = await schoolModel.findOne({phoneschool})
          if(checkPhoneNumber){
          return res.status(400).json({
              success: false,
              message: "phone number already"
          })
          }  
  
          const school =   await  schoolModel.create({
              nameschool: nameschool, 
              emailschool:emailschool,
              websiteschool: (websiteschool.startsWith('https://')? websiteschool : `https://${websiteschool}`) || '',  
              phoneschool: phoneschool,
              location: location,
          })
          return res.json({
              success: true,
              message: "create school success",
              school: school
          })
    } catch (error) {
        console.log(error)
    }
   
     
     
}

  /// [PUT] http://localhost:5000/admin/school/details/:id
const update = (req, res, next) =>{
    try {
        schoolModel.updateOne({_id: req.params.accId }, req.body)
            .then(() => res.json(req.body))
            .catch(next)
    } catch (error) {
        console.log(error)
    }
    
  }
  /// [DELETE]  http://localhost:5000/admin/school/:id
const Delete = (req, res, next) =>{ 
    try {
        schoolModel.findByIdAndDelete({_id: req.params.accId }, req.body)
            .then(() => res.json({
                success: true,
                schoolDetele: req.body
            }))
            .catch(next)
    } catch (error) {
        console.log(error)
    }
 
}

const Delete_many = async (req, res, next) =>{ 
    try {
        const ids = req.params.id.split(','); // lấy danh sách id từ url và split ra thành mảng
    
        const result = await schoolModel.deleteMany({ _id: { $in: ids } }); // tìm và xóa tất cả bài đăng có _id trong danh sách ids
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  };
  
module.exports = {
    listSchool: listSchool,
    showDetails: showDetails,
    createschool: createschool,
    update: update,
    Delete: Delete,
    Delete_many: Delete_many
}