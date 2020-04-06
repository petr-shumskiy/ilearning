const {Router} = require('express')
const router = Router()
const authController = require('../controllers/auth')


// /api/auth
router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/facebook', authController.socialLogin('facebook'))
router.post('/google', authController.socialLogin('google'))

module.exports = router