const express=require('express')
const router=express.Router()
const{
    searchBooks,
    getBooks,
    getLendedBooks,
    viewDues,
    addBook,
    removeBook,
    updateBook,
    getDueBooks
}=require('../controllers/booksController')


//user
router.get('/searchBooks',searchBooks)
router.get('/viewLendedBooks',getLendedBooks)
router.get('/viewDues',viewDues)


//admin
router.get('/getBooks',getBooks)
router.post('/addBook',addBook)
router.delete('/removeBook',removeBook)
router.put('/updateBook',updateBook)
router.get('/getDueBooks',getDueBooks)

module.exports=router