const Book = require('../models/Book')

module.exports = (req, res, next) => {
    
    const {userId, rating} = req.body
    Book.findOne({ _id: req.params.id })
    
    .then(book => 
        {
            const filteredBooks = book.ratings.filter(rating => rating.userId === userId)
            req.ratedByUser = filteredBooks.length > 0 ? "true" : "false"
            req.ratedByUser === "false" ? next() : res.status(400).json({ error : "Book already rated by this user." }) // if already rated by current user
        })
    .catch(error => 
        {
            req.ratedByUser = "error"
            res.status(400).json({error})
        })
}