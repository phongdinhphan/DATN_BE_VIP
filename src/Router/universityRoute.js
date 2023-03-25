const express = require('express')
const router = express.Router()

const uniController = require('../Controller/universityManagerController')
const verify = require('../Middleware/auth')

router.get('/',uniController.listStudent)
router.get('/details/:accId',uniController.detailsStudent)
router.put('/details/:accId',uniController.updateStudent)
router.put('/update-profile',verify,uniController.update_profile)
router.get('/profile',verify,uniController.profile)


module.exports = router