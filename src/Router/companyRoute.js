const express = require('express')
const router = express.Router()
const companyManagerController = require('../Controller/companyManagerController')


const verify = require('../Middleware/auth')

router.get('/',verify,companyManagerController.listPost)
router.get('/details/:accId',companyManagerController.showDetails)
router.put('/details/:accId',companyManagerController.update)
router.post('/create',companyManagerController.createPost)
router.delete('/:accId',companyManagerController.Delete)


module.exports = router