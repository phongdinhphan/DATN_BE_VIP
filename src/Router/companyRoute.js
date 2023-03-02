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

router.get('/list-cv/details/:accId',companyManagerController.showDetails_cv)
router.post('/list-cv/details/:accId/send-email',companyManagerController.send_email)




module.exports = router