const Book = require('../models/Book')
const fs = require('fs')
const { off } = require('process')

/*
if multer involved : 
req.body.file + req.body.book
without that :
req.body
*/

// POST BOOK
exports.postBook = (req, res, next) => {
    const parsedBook = JSON.parse(req.body.book)
    // parsedBook.userId could be falsified, so we will get it through auth, jwt more reliable
    delete parsedBook.userId
    if(parsedBook.ratings[0].grade === 0 || parsedBook.ratings[0].grade == undefined) parsedBook.averageRating = 0
    console.log(parsedBook)
    const book = new Book({...parsedBook, userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    book.save()
        .then(() => res.status(201).json({ message: 'Book saved.'}))
        .catch(error => {
            res.status(400).json({ message : "This book can't be saved.", error : error })
            fs.unlink('images/' + req.file.filename, function(err) {
                if(err && err.code) {
                    console.info(`File : ${req.file.filename} can't be removed.`)
                }
            })
        })
}


// GET BOOK
exports.getBook = (req, res, next) => { 
    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            book.averageRating = book.averageRating.toFixed(1) // limited number of decimals
            res.status(200).json(book)
        })
    .catch(error => res.status(404).json({ message : "This book can't be found.", error : error }))
}


// UPDATE BOOK
exports.updateBook = (req, res, next) => {
    // populate tempBook in two different ways : with or without file
    const tempBook = req.file ? {...JSON.parse(req.body.book), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body}
    // not replaced cause that field needs no update
    delete tempBook.userId

    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            // checks if jwt user = book creator
            if(book.userId === req.auth.userId)
            {
                const filename = book.imageUrl.split('/images/')[1]

                Book.updateOne({ _id: req.params.id }, { ...tempBook })
                .then( () => {
                    res.status(200).json({ message : "Book updated."})
                    // if the request contains a new image, remove the previous one
                    if (req.file) { 
                        fs.unlink('images/' + filename, function(err) {
                            if(err && err.code) {
                                console.info(`File : ${filename} can't be removed.`)
                            }
                        })}
                })
                .catch(error => {
                    res.status(400).json({ message : "This book can't be updated.", error : error })
                    // if the db update fails, remove the replacement image already saved by multer
                    if (req.file) {
                        fs.unlink('images/' + req.file.filename, function(err) {
                            if(err && err.code) {
                                console.info(`File : ${req.file.filename} can't be removed.`)
                            }
                        })}
                })
            }else
            {
                res.status(403).json({ message : 'Not authorized.' });
            }
        })
    .catch(error => res.status(404).json({ message : "This book can't be found.", error : error }))
}


// DELETE BOOK
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            // checks if jwt user = book creator
            if(book.userId === req.auth.userId) 
            {
                const filename = book.imageUrl.split('/images/')[1]

                Book.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.status(200).json({ message :"Book deleted."})
                    fs.unlink('images/' + filename, function(err) {
                        if(err && err.code) {
                            console.info(`File : ${filename} can't be removed.`)
                        }
                    })
                })
                .catch(error => res.status(400).json({ message : "This book can't be deleted.", error : error }))
            }else
            {
                res.status(403).json({ message : 'Not authorized.'});
            }
        })
    .catch(error => res.status(404).json({ message : "This book can't be found.", error : error }))
}


// GET ALL BOOKS
exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ message : "Can't find any book.", error : error }))
}


// TOP 3 BOOKS
exports.getTop = (req, res, next) => {
    Book.find().sort({averageRating:-1}).limit(3) // descending order
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ message : "Can't find any book.", error : error }))
}


// POST RATING
exports.postRating = (req, res, next) => {
    const {userId, rating} = req.body
    Book.updateOne(
        { _id: req.params.id },
        { $push: {ratings : { userId : req.auth.userId, grade : rating }} }) // using auth id for security purposes
        .then(() => {
            // no res.status(200) cause more processing to come
            // res.status(200) handled by the last middleware in the chain
            req.bookId = req.params.id 
            next()
        })
        .catch(error => res.status(401).json({ message : "This book can't be found.", error : error }))
}


// UPDATE AVERAGE RATING
exports.updateAvgRating = (req, res, next) => {
    Book.updateOne(
        { _id: req.bookId},
        { $set :{ "averageRating" : req.bookAvg }} // $ = first result
        )
        .then(() => {
            // console.log("Avg rating updated.")
            // sending back refreshed book after updating avg rating
            Book.findOne({ _id: req.params.id }).then(book => res.status(200).json(book)).catch(error => res.status(404).json({ message : "This book can't be found.", error : error }))
        })
        .catch(error => res.status(401).json({ message : "This book can't be found.", error : error }))
}
