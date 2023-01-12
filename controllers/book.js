const Book = require('../models/Book')

/*
si passage multer : 
req.body.file + req.body.book
autrement
req.body
*/

// POST BOOK
exports.postBook = (req, res, next) => {
    const parsedBook = JSON.parse(req.body.book);
    delete parsedBook.userId // body id could be falsified, so we get it through auth
    const book = new Book({...parsedBook, userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    book.save()
        .then(() => res.status(201).json({ message: 'Book saved.'}))
        .catch(error => res.status(400).json({ error }))
}


// GET BOOK
exports.getBook = (req, res, next) => { 
    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            book.averageRating = book.averageRating.toFixed(1) // limited number of decimals
            res.status(200).json(book)
        })
    .catch(error => res.status(404).json({ error }))
}


// UPDATE BOOK
exports.updateBook = (req, res, next) => {
    const tempBook = req.file ? {...JSON.parse(req.body.book), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body} // defined in two different ways if there is a file or no to add
    delete tempBook.userId // not replaced cause no need to update that field

    Book.findOne({ _id: req.params.id }) // get book if existing
    .then(book => 
        {
            if(book.userId === req.auth.userId) // checks if connected user = book creator
            {
                Book.updateOne({ _id: req.params.id }, { ...tempBook })
                .then(res.status(201).json("Book updated."))
                .catch(error => res.status(400).json({ error }))
            }else
            {
                res.status(401).json({ message : 'Not authorized.'});
            }
        })
    .catch(error => res.status(400).json({ error }))
}


// DELETE BOOK
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id }) // get book if existing
    .then(book => 
        {
            if(book.userId === req.auth.userId) // checks if connected user = book creator
            {
                Book.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json("Book deleted."))
                .catch(error => res.status(400).json({ error }))
            }else
            {
                res.status(401).json({ message : 'Not authorized.'});
            }
        })
}


// GET ALL BOOKS
exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}


// TOP 3 BOOKS
exports.getTop = (req, res, next) => {
    Book.find().limit(3).sort({averageRating:-1}) // descending order
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}


// POST RATING
exports.postRating = (req, res, next) => {
    const {userId, rating} = req.body
    Book.updateOne(
        { _id: req.params.id },
        { $push: {ratings : { userId : req.auth.userId, grade : rating }} }) // using auth id for security purposes
        .then(() => {
            req.bookId = req.params.id
            next()
        })
        .catch(error => res.status(400).json({ error }))
}


// UPDATE AVERAGE RATING
exports.updateAvgRating = (req, res, next) => {
    Book.updateOne(
        { _id: req.bookId},
        { $set :{ "averageRating" : req.bookAvg }} // $ = first result
        )
        .then(() => {
            console.log("Avg rating updated.")
            // sending back book for refresh only after updating avg rating
            Book.findOne({ _id: req.params.id }).then(book => res.status(200).json(book)).catch(error => res.status(404).json({ error }))
        })
        .catch(error => console.log({ error }))
}
