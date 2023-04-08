const express = require('express')
const router = express.Router()

const is_School = require('../Middleware/is_School')
const is_login = require('../Middleware/is_login');

const uniController = require('../Controller/universityManagerController')
const verify = require('../Middleware/auth')

router.get('/',verify,uniController.listStudent)
router.get('/details/:accId',uniController.detailsStudent)
router.put('/details/:accId',is_login,is_School,uniController.updateStudent)
router.put('/update-profile',is_login,is_School,verify,uniController.update_profile)
router.get('/profile',is_login,is_School,verify,uniController.profile)


module.exports = router