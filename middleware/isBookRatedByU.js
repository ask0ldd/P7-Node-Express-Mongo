const Book = require('../models/Book')

module.exports = (req, res, next) => {
    
    const {userId, rating} = req.body
    Book.findOne({ _id: req.params.id })
    
    .then(book => 
        {
            const filteredBooks = book.ratings.filter(rating => rating.userId === userId)
            req.ratedByUser = filteredBooks.length > 0 ? "true" : "false"
            // if already not rated by user : next(), else : error
            req.ratedByUser === "false" ? next() : res.status(403).json({ error : "Book already rated by this user." })
        })
    .catch(error => 
        {
            req.ratedByUser = "error"
            res.status(400).json({error})
        })
}