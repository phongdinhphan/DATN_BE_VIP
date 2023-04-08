const express = require('express')
const router = express.Router()
const companyManagerController = require('../Controller/companyManagerController')
const multer = require("multer");

const verify = require('../Middleware/auth')
const is_Com = require('../Middleware/is_Company')
const is_login = require('../Middleware/is_login');

const upload = require('../Middleware/multer')
const uploadCloud = require('../Middleware/cloudinary.config')


router.get('/',verify,companyManagerController.listPost)
router.get('/list-cv',verify,companyManagerController.listCV)
router.get('/details/:accId',companyManagerController.showDetails)
router.put('/details/:accId',is_Com,companyManagerController.update)
router.post('/create',is_Com,uploadCloud.single('logo'),companyManagerController.createPost)



router.delete('/:accId',is_login,is_Com,companyManagerController.Delete)

router.get('/list-cv/details/:accId',companyManagerController.showDetails_cv)
router.put('/list-cv/details/:accId',is_Com,companyManagerController.refuse_cv)
router.post('/list-cv/details/:accId/send-email',is_Com,companyManagerController.send_email)

router.put('/update-profile',verify,is_Com,companyManagerController.update_profile)
router.get('/profile',verify,companyManagerController.profile)
router.get('/list-skill',companyManagerController.listSkill)
router.get('/listcompany',companyManagerController.listCompany)
router.get('/listmajor',companyManagerController.listMajor)
router.post('/profile/upload',is_Com,verify,uploadCloud.single('logo'),companyManagerController.upload_logo)
router.get('/listareas',companyManagerController.listAreas)



router.delete('/posts/:id',is_Com, companyManagerController.Delete_many)
module.exports = router