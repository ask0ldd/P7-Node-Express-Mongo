const express = require ("express")
const router = express.Router()

const booksCtrl = require ('../controllers/book')

// router.use with next called would create a middleware that would execute before all the following middleware

// middleware // '/' added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.post('/', booksCtrl.postBook) // pas execute function mais passe fonction dc pas de ()
router.get('/:id', booksCtrl.getBook)

module.exports = router