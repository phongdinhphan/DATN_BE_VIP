const express = require('express')
const router = express.Router()
const accountController = require('../Controller/accountController')
const companytController = require('../Controller/companyController')
const majorController = require('../Controller/majorController')
const schoolController = require('../Controller/schoolController')
const jobPostController = require('../Controller/jobpostController')
const skillsController = require('../Controller/skillsController')
const reportController = require('../Controller/reportController')

const accountModel = require('../Models/accountModel')
const reportModel = require('../Models/reportModel')

const is_admin = require('../Middleware/is_admin');
const is_login = require('../Middleware/is_login');

const verify = require('../Middleware/auth')




//Route show list
router.get('/account',accountController.listUser)
router.get('/school',schoolController.listSchool)
router.get('/major',majorController.listMajor)
router.get('/company',companytController.listCompany)
router.get('/jobpost',jobPostController.listJobpost)
router.get('/skill',skillsController.listSkill)
router.get('/report',reportController.listReport)


// //Route details
router.get('/account/details/:accId',accountController.showDetails)
router.get('/school/details/:accId',schoolController.showDetails)
router.get('/major/details/:accId',majorController.showDetails)
router.get('/company/details/:accId',companytController.showDetails)
router.get('/jobpost/details/:accId',jobPostController.details)
router.get('/skill/details/:accId',skillsController.showDetails)




// //Route update
router.put('/account/details/:accId',is_login,is_admin,accountController.update)
router.put('/school/details/:accId',is_login,is_admin,schoolController.update)
router.put('/major/details/:accId',is_login,is_admin,majorController.update)
router.put('/company/details/:accId',is_login,is_admin,companytController.update)
router.put('/jobpost/details/:accId',is_login,is_admin,jobPostController.update)
router.put('/skill/details/:accId',is_login,is_admin,skillsController.update)


// //Route create
router.post('/account/create',is_login,is_admin,accountController.createAccount)
router.post('/school/create',is_login,is_admin,schoolController.createschool)
router.post('/major/create',is_login,is_admin,majorController.createMajor)
router.post('/company/create',is_login,is_admin,companytController.createCompany)
router.post('/skill/create',is_login,is_admin,skillsController.createSkill)


// // //Route save
// // router.post('/account/save',userController.save)
// // router.post('/school/save',schoolController.save)
// // router.post('/major/save',majorController.save)
// router.post('/company/save',companytController.save)

// //Route delete
router.delete('/account/:accId',is_login,is_admin,accountController.Delete)
router.delete('/school/:accId',is_login,is_admin,schoolController.Delete)
router.delete('/major/:accId',is_login,is_admin,majorController.Delete)
router.delete('/company/:accId',is_login,is_admin,companytController.Delete)
router.delete('/skill/:accId',is_login,is_admin,skillsController.Delete)
router.delete('/jobpost/:accId',is_login,is_admin,jobPostController.Delete)


// Route delete many
router.delete('/posts/account/:id',is_login,is_admin, accountController.Delete_many )
router.delete('/posts/school/:id',is_login,is_admin,schoolController.Delete_many)
router.delete('/posts/major/:id',is_login,is_admin,majorController.Delete_many)
router.delete('/posts/company/:id',is_login,is_admin,companytController.Delete_many)
router.delete('/posts/jobpost/:id',is_login,is_admin,jobPostController.Delete_many)


//Send mail report
router.post('/report/send_mail',is_login,is_admin,reportController.send_Email_Report)


// router.get('/test',verify, is_admin,accountController.listUser)

module.exports = router;