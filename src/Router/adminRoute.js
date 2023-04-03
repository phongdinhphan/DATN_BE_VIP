const express = require('express')
const router = express.Router()
const accountController = require('../Controller/accountController')
const companytController = require('../Controller/companyController')
const majorController = require('../Controller/majorController')
const schoolController = require('../Controller/schoolController')
const jobPostController = require('../Controller/jobpostController')
const skillsController = require('../Controller/skillsController')
const accountModel = require('../Models/accountModel')


const verify = require('../Middleware/auth')




//Route show list
router.get('/account',accountController.listUser)
router.get('/school',schoolController.listSchool)
router.get('/major',majorController.listMajor)
router.get('/company',companytController.listCompany)
router.get('/jobpost',jobPostController.listJobpost)
router.get('/skill',skillsController.listSkill)


// //Route details
router.get('/account/details/:accId',accountController.showDetails)
router.get('/school/details/:accId',schoolController.showDetails)
router.get('/major/details/:accId',majorController.showDetails)
router.get('/company/details/:accId',companytController.showDetails)
router.get('/jobpost/details/:accId',jobPostController.details)
router.get('/skill/details/:accId',skillsController.showDetails)




// //Route update
router.put('/account/details/:accId',verify,accountController.update)
router.put('/school/details/:accId',schoolController.update)
router.put('/major/details/:accId',majorController.update)
router.put('/company/details/:accId',companytController.update)
router.put('/jobpost/details/:accId',jobPostController.update)
router.put('/skill/details/:accId',skillsController.update)


// //Route create
router.post('/account/create',accountController.createAccount)
router.post('/school/create',schoolController.createschool)
router.post('/major/create',majorController.createMajor)
router.post('/company/create',companytController.createCompany)
router.post('/skill/create',skillsController.createSkill)


// // //Route save
// // router.post('/account/save',userController.save)
// // router.post('/school/save',schoolController.save)
// // router.post('/major/save',majorController.save)
// router.post('/company/save',companytController.save)

// //Route delete
router.delete('/account/:accId',accountController.Delete)
router.delete('/school/:accId',schoolController.Delete)
router.delete('/major/:accId',majorController.Delete)
router.delete('/company/:accId',companytController.Delete)
router.delete('/skill/:accId',skillsController.Delete)


// Route delete many
router.delete('/posts/account/:id', accountController.Delete_many )
router.delete('/posts/school/:id',schoolController.Delete_many)
router.delete('/posts/major/:id',majorController.Delete_many)
router.delete('/posts/company/:id',companytController.Delete_many)

module.exports = router;