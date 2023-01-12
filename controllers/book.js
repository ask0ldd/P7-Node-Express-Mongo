const Book = require('../models/Book')

/*
si passage multer : 
req.body.file + req.body.book
autrement
req.body
*/

exports.postBook = (req, res, next) => {
    const parsedBook = JSON.parse(req.body.book);
    delete parsedBook.userId // id could be falsified, so we get it through auth
    const book = new Book({...parsedBook, userId: req.auth.userId, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    book.save()
        .then(() => res.status(201).json({ message: 'Book enregistré !'}))
        .catch(error => res.status(400).json({ error }))
}

exports.getBook = (req, res, next) => { 
    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            book.averageRating = book.averageRating.toFixed(1) // limited number of decimals
            res.status(200).json(book)
        })
    .catch(error => res.status(404).json({ error }))
}

exports.updateBook = (req, res, next) => {
    const tempBook = req.file ? {...JSON.parse(req.body.book), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body}
    delete tempBook.userId // not replaced cause no need to update that field

    Book.findOne({ _id: req.params.id })
    .then(book => 
        {
            if(book.userId === req.auth.userId) // before update check if authorized user
            {
                Book.updateOne({ _id: req.params.id}, {...tempBook})
                .then(res.status(201).json("Book updated"))
                .catch(error => res.status(400).json({ error }))
            }else
            {
                res.status(401).json({ message : 'Not authorized'});
            }
        })
    .catch(error => res.status(400).json({ error }))
}

exports.deleteBook = (req, res, next) => { // verify user?
    console.log(req.params.id)
    Book.deleteOne({ _id: req.params.id })
    .then(book => res.status(200).json("Book deleted"))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}

exports.getTop = (req, res, next) => {
    Book.find().limit(3).sort({averageRating:-1})
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }))
}

exports.postRating = (req, res, next) => {
    console.log(req.body)
    const {userId, rating} = req.body
    console.log(req.params.id)
    Book.updateOne(
        { _id: req.params.id },
        { $push: {ratings : { userId : req.auth.userId, grade : rating }} }) // id recupere via l'auth par sécurité
        .then(books => {
            res.status(200).json("Rating posted.") // renvoyer le book N!
            req.bookId = req.params.id
            next()})
        .catch(error => res.status(400).json({ error }))
}

exports.updateAvgRating = (req, res, next) => {
    Book.updateOne(
        { _id: req.bookId},
        { $set :{ "averageRating" : req.bookAvg }} // $ = first result
        )
        .then(books => console.log("updated avg rating"))
        .catch(error => console.log({ error }))
}

/*exports.postRating = (req, res, next) => {
    console.log("postrating")
    console.log({...req.body})
    const {bookid, userid, grade}= req.body // recuperer userid via token?
    console.log(bookid)
    Book.updateOne(
        { _id: bookid },
        { author : "joe abercrombie"})
        .then(books => res.status(201).json("okdoki"))
        .catch(error => res.status(404).json({ error }))
}*/
