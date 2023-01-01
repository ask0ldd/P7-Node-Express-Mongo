const express = require ("express")
const router = express.Router()

const booksCtrl = require ('../controllers/book')

// middleware // '/' added to the uri already specified in app.js : app.use('/api/books', bookRoutes)
router.post('/', booksCtrl.postBook) // pas execute function mais passe fonction dc pas de ()

module.exports = router