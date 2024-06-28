const express = require('express')
const router = express.Router()
const {
    searchBooks,
    getBooks,
    getLendedBooks,
    addBook,
    removeBook,
    updateBook,
    getDueBooks, lendBook
} = require('../controllers/booksController')


//user
router.get('/searchBooks', searchBooks)
router.get('/viewLendedBooks', getLendedBooks)


//admin
router.get('/getBooks', getBooks)
router.post('/addBook', addBook)
router.delete('/removeBook/:bookId', removeBook)
router.put('/updateBook/:bookId', updateBook)
router.post('/lendBook', lendBook)
router.get('/getDueBooks', getDueBooks)

module.exports = router