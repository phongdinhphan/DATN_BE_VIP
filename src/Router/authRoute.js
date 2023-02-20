const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')

router.post('/register', authController);
router.post('/login', authController);

// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', authController);
router.post('/reset-password', authController);

module.exports = router
