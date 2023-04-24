const express = require('express')
const router = express.Router()
const is_login = require('../Middleware/is_login');


const studentManagerController = require('../Controller/studentManagerControler')
const verify = require('../Middleware/auth')
const upload = require('../Middleware/multer_student')
const uploadCloud = require('../Middleware/cloudinary_student')


router.get('/',studentManagerController.listPost)
router.get('/details/:accId',studentManagerController.detailsPost)

router.get('/cv',verify,studentManagerController.listCV)
router.get('/cv/details/:accId',verify,studentManagerController.detailsCV)
router.post('/create',uploadCloud.single("cv"),studentManagerController.createCV)    

router.put('/update-profile',verify,studentManagerController.update_profile)
router.get('/profile',verify,studentManagerController.profile)
router.post('/setting/change-password',verify,studentManagerController.change_pass)
router.put('/details/:accId',verify,studentManagerController.add_favorite)
router.put('/details/delete-fa/:accId',verify,studentManagerController.delete_favorite)
router.post('/addcv',verify,uploadCloud.single("cv1"),studentManagerController.up_cv)    
router.get('/list-favorite',verify,studentManagerController.get_favorite)    
router.get('/listmajor',studentManagerController.listMajor)
router.get('/listcompany',studentManagerController.listCompany)
router.get('/listcompany/:accId',studentManagerController.showDetails)
router.get('/listareas',studentManagerController.listAreas)
router.post('/report',verify,studentManagerController.createReport)

router.post('/profile/upload',verify,uploadCloud.single('avatar'),studentManagerController.upload_avatar)


module.exports = router;