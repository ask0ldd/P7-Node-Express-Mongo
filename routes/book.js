const express = require ("express")
const router = express.Router()

const avgRating = require('../middleware/avgRating');
const multer = require('../middleware/multer-config')
const isRated = require('../middleware/isBookRatedByU')
const auth = require('../middleware/auth')

const booksCtrl = require ('../controllers/book')

// router.use with next called would create a middleware that would execute before all the following middleware

// middleware // '/' added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.get('/', booksCtrl.getAllBooks)
//router.put('/', multer, booksCtrl.postBook)
router.get('/bestrating', booksCtrl.getTop) // bestrating avant /:id pr que bestrating ne puisse pas etre traite comme un id
router.post('/:id/rating', auth, isRated, booksCtrl.postRating, avgRating, booksCtrl.updateAvgRating)
//router.post('/:id/rating', booksCtrl.postRating)
//router.put('/:id/rating', booksCtrl.updateRating) //recalculate avg rating too
router.get('/:id', booksCtrl.getBook)
router.post('/', auth, multer, booksCtrl.postBook) // pas execute function mais passe fonction dc pas de ()
router.delete('/:id', booksCtrl.deleteBook)


module.exports = router