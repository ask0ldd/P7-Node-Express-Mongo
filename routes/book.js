const express = require ("express")
const router = express.Router()

const avgRating = require('../middleware/avgRating');
const multer = require('../middleware/multer-config')
const isRated = require('../middleware/isBookRatedByU')
const auth = require('../middleware/auth')

const booksCtrl = require ('../controllers/book')

// router.use with next called would create a middleware that would execute before all the following middleware

// '/' : added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.get('/', booksCtrl.getAllBooks)
router.get('/bestrating', booksCtrl.getTop) // bestrating before /:id in the route lists so bestrating can't be considered as an :id
router.post('/:id/rating', auth, isRated, booksCtrl.postRating, avgRating, booksCtrl.updateAvgRating)
router.get('/:id', booksCtrl.getBook)
router.post('/', auth, multer, booksCtrl.postBook) // no () cause passing a function not its result / no :id cause passed in the body
router.put('/:id', auth, multer, booksCtrl.updateBook)
router.delete('/:id', auth, booksCtrl.deleteBook)

module.exports = router