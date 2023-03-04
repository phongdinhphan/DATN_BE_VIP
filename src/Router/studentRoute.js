const express = require('express')
const router = express.Router()

const studentManagerController = require('../Controller/studentManagerControler')
const verify = require('../Middleware/auth')
const upload = require('../Middleware/multer_student')

router.get('/',studentManagerController.listPost)
router.get('/details/:accId',studentManagerController.detailsPost)

router.get('/cv',verify,studentManagerController.listCV)
router.get('/cv/details/:accId',verify,studentManagerController.detailsCV)
router.post('/create',upload.single("cv"),studentManagerController.createCV)
module.exports = router;