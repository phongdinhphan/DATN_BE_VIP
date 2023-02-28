const express = require('express')
const router = express.Router()
const companyManagerController = require('../Controller/companyManagerController')
const multer = require("multer");
const upload2 =  multer({ dest: "uploads/" });

const verify = require('../Middleware/auth')
const upload = require('../Middleware/multer')

router.get('/',verify,companyManagerController.listPost)
router.get('/list-cv',verify,companyManagerController.listCV)
router.get('/details/:accId',companyManagerController.showDetails)
router.put('/details/:accId',companyManagerController.update)
router.post('/create',upload.single("file"),companyManagerController.createPost)
router.delete('/:accId',companyManagerController.Delete)
// router.post("/upload", async (req, res) => {
//     try {
//       if(!req.files){
//         res.send({
//           status: false,
//           message: "No files"
//         })
//       } else {
//         const {picture} = req.files
  
//           picture.mv("./uploads/" + picture.name)
  
//         res.send({
//           status: true,
//           message: "File is uploaded"
//         })
//       }
//     } catch (e) {
//       res.status(500).send(e)
//     }
//   })



module.exports = router