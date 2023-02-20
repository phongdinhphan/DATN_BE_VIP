const express = require('express')
const router = express.Router()

const uniController = require('../Controller/universityManagerController')
const verify = require('../Middleware/auth')

router.get('/',verify,uniController.listStudent)
router.get('/details/:accId',verify,uniController.detailsStudent)
router.put('/details/:accId',uniController.updateStudent)



module.exports = router