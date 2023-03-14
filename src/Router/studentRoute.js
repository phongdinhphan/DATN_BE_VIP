const express = require('express')
const router = express.Router()

const studentManagerController = require('../Controller/studentManagerControler')
const verify = require('../Middleware/auth')
const upload = require('../Middleware/multer_student')
const uploadCloud = require('../Middleware/cloudinary_student')


router.get('/',studentManagerController.listPost)
router.get('/details/:accId',studentManagerController.detailsPost)

router.get('/cv',verify,studentManagerController.listCV)
router.get('/cv/details/:accId',verify,studentManagerController.detailsCV)
router.post('/create',uploadCloud.single("cv"),studentManagerController.createCV)    

router.put('/update-profile',verify,studentManagerController.update_profile)
router.get('/profile',verify,studentManagerController.profile)

module.exports = router;