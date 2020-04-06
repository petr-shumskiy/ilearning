const {Router} = require('express')
const passport = require('passport')
const collectionsController = require('../controllers/collectionsController')
const router = Router()

// api/collection
//todo protect routes!
router.get('/:id', collectionsController.getAllCollections)
router.get('/:id', collectionsController.getCollectionById)
router.post('/', passport.authenticate('jwt', {session: false}), collectionsController.createCollection)
router.put('/:id', passport.authenticate('jwt', {session: false}), collectionsController.updateCollection)
router.delete('/:id', passport.authenticate('jwt', {session: false}), collectionsController.deleteCollection)

module.exports = router