const express = require('express')
const router = express.Router()

const studentManagerController = require('../Controller/studentManagerControler')
const verify = require('../Middleware/auth')

router.get('/',studentManagerController.listPost)
router.get('/details/:accId',studentManagerController.detailsPost)

router.get('/cv',verify,studentManagerController.listCV)
router.get('/cv/details/:accId',verify,studentManagerController.detailsCV)
router.post('/create',studentManagerController.createCV)

module.exports = router;