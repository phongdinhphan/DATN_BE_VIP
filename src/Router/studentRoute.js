const express = require('express')
const router = express.Router()

const studentManagerController = require('../Controller/studentManagerControler')
const verify = require('../Middleware/auth')

router.get('/',studentManagerController.listPost)
router.get('/details/:accId',studentManagerController.detailsPost)

router.get('/cv',verify,studentManagerController.listCV)
router.get('/details/cv/:accId',verify,studentManagerController.detailsCV)
router.get('/create',studentManagerController.createCV)

module.exports = router;