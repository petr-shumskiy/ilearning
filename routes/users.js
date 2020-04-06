const {Router} = require('express')
const router = Router()
const passport = require('passport')
const usersController = require('../controllers/users')

// /api/users

router.get('/validate', passport.authenticate('jwt', {session: false}), usersController.validateUser)
router.get('/', passport.authenticate('jwt', {session: false}), usersController.getUsers)
router.delete('/delete', passport.authenticate('jwt', {session: false}), usersController.deleteUsers)
router.put('/block', passport.authenticate('jwt', {session: false}), usersController.blockUsers)

module.exports = router