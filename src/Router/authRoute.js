const express = require('express')
const router = express.Router()
const authController = require('../Controller/authController')

router.post('/register', authController);
router.post('/login', authController);

// router.post('/logout', validate(authValidation.logout), authController.logout);
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router
