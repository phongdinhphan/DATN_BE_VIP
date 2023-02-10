const express = require('express')
const router = express.Router()
const accountController = require('../Controller/accountController')
const companytController = require('../Controller/companyController')
const majortModel = require('../Models/majorModel')
const schooltModel = require('../Models/schoolModel')

const verify = require('../Middleware/auth')




//Route show list
router.get('/account',verify,accountController.listUser)
// router.get('/school',schoolController.listSchool)
// router.get('/major',majorController.listMajor)
router.get('/company',companytController.listCompany)

// //Route details
router.get('/account/details/:accId',verify,accountController.showDetails)
// router.get('/school/details/:accId',schoolController.showDetails)
// router.get('/major/details/:accId',majorController.showDetails)
router.get('/company/details/:accId',companytController.showDetails)


// //Route update
router.put('/account/details/:accId',verify,accountController.update)
// router.put('/school/details/:accId',schoolController.update)
// router.put('/major/details/:accId',majorController.update)
router.put('/company/details/:accId',companytController.update)


// //Route create
router.post('/account/create',verify,accountController.createAccount)
// router.get('/school/create',schoolController.createUser)
// router.get('/major/create',majorController.createUser)
router.post('/company/create',companytController.createCompany)


// // //Route save
// // router.post('/account/save',userController.save)
// // router.post('/school/save',schoolController.save)
// // router.post('/major/save',majorController.save)
// router.post('/company/save',companytController.save)

// //Route delete
router.delete('/account/:accId',verify,accountController.Delete)
// router.delete('/school/:accId',schoolController.Delete)
// router.delete('/major/:accId',majorController.Delete)
router.delete('/company/:accId',companytController.Delete)



module.exports = router;