const express = require ("express")
const router = express.Router()

const avgrating = require('../middleware/avgRating');

const booksCtrl = require ('../controllers/book')

// router.use with next called would create a middleware that would execute before all the following middleware

// middleware // '/' added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.post('/', booksCtrl.postBook) // pas execute function mais passe fonction dc pas de ()
router.get('/bestrating', booksCtrl.getTop) // bestrating avant /:id pr que bestrating ne puisse pas etre traite comme un id
router.post('/:id/rating', booksCtrl.postRating, avgrating, booksCtrl.updateAvgRating)
//router.put('/:id/rating', booksCtrl.updateRating) //recalculate avg rating too
router.get('/:id', booksCtrl.getBook)


module.exports = router