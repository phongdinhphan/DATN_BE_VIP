const express = require('express')
const router = express.Router()
const accountController = require('../Controller/accountController')
const companytModel = require('../Models/companyModel')
const majortModel = require('../Models/majorModel')
const schooltModel = require('../Models/schoolModel')

const verifyToken = require('../Middleware/auth')




//Route show list
router.get('/account',verifyToken,accountController.listUser)
// router.get('/school',schoolController.listSchool)
// router.get('/major',majorController.listMajor)
// router.get('/company',companyController.listCompany)

// //Route details
// router.get('/account/details/:accId',userController.showDetails)
// router.get('/school/details/:accId',schoolController.showDetails)
// router.get('/major/details/:accId',majorController.showDetails)
// router.get('/company/details/:accId',companyController.showDetails)


// //Route update
// router.put('/account/details/:accId',userController.update)
// router.put('/school/details/:accId',schoolController.update)
// router.put('/major/details/:accId',majorController.update)
// router.put('/company/details/:accId',companyController.update)


// //Route create
router.post('/account/create',accountController.createAccount)
// router.get('/school/create',schoolController.createUser)
// router.get('/major/create',majorController.createUser)
// router.get('/company/create',companyController.createUser)


// //Route save
// router.post('/account/save',userController.save)
// router.post('/school/save',schoolController.save)
// router.post('/major/save',majorController.save)
// router.post('/company/save',companyController.save)

// //Route delete
// router.delete('/account/:accId',userController.Delete)
// router.delete('/school/:accId',schoolController.Delete)
// router.delete('/major/:accId',majorController.Delete)
// router.delete('/company/:accId',companyController.Delete)



module.exports = router;