const { response } = require('express');
const LendedBook = require('../models/lendedBookModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');

const searchBooks = async (request, response) => {
    const { genre, author } = request.body

    try {
        const result = await Book.find({
            $or: [
                { genre: genre }
            ],
            $or: [
                { author: author }
            ],
            $and: [
                { isAvailable: true }
            ]
        });
        response.status(200).json(result)
    } catch (error) {
        response.status(500).json({ message: "Error getting Books", error: error.message })
    }
}

// Get All Books
const getBooks = async (request, response) => {
    try {
        const books = await Book.find();
        response.status(200).json({ message: "All books retrieved", books });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const lendBook = async (request, response) => {
    const { userId, bookId } = request.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return response.status(404).json({ message: "Book not found" });
        }

        // Check if the book is already lended
        const isBookLended = await LendedBook.findOne({ bookId });
        if (isBookLended) {
            return response.status(400).json({ message: "Book is already lended" });
        }

        // Create a new lended book record
        const newLendedBook = new LendedBook({
            userId,
            bookId,
            lendedDate: new Date()
        });

        // Save the lended book record
        await newLendedBook.save();

        response.status(201).json({ message: "Book successfully lended", lendedBook: newLendedBook });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};




const getLendedBooks = async (request, response) => {
    const lendedBooks = await LendedBook.find()
    try {
        response.status(201).json({ message: "Lended Books Retreived", lendedBooks: lendedBooks })
    } catch (error) {

    }
};



// Add Book
const addBook = async (request, response) => {
    const { bookName, author, title, publisher, genre, language, publishedDate } = request.body;

    const newBook = new Book({
        bookName,
        author,
        title,
        publisher,
        genre,
        language,
        publishedDate
    });

    try {
        const savedBook = await newBook.save();
        response.status(201).json({ message: "Book added successfully", book: savedBook });
    } catch (error) {
        response.status(400).json({ message: "Failed to add book", error: error.message });
    }
};


const removeBook = async (request, response) => {
    // Logic to remove a book
    const bookId = request.params.bookId;

    try {
        const book = await Book.findByIdAndDelete(bookId)
        response.status(201).json({ message: "User Deleted Successfully" })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
};


const updateBook = async (request, response) => {
    const { bookId } = request.params;
    const updatedFields = request.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedFields, { new: true });

        if (!updatedBook) {
            return response.status(404).json({ message: "Book not found" });
        }

        response.status(200).json({ message: "Book updated successfully", updatedBook });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const getDueBooks = async (request, response) => {
    try {
        const lendedBooks = await LendedBook.find();

        let dueBooks = [];
        let totalDueAmount = 0;

        lendedBooks.forEach(async(lendedBook) => {
            const lendedDate = new Date(lendedBook.lendedDate);
            const currentDate = new Date();
            const dueDays = Math.ceil((currentDate - lendedDate) / (1000 * 60 * 60 * 24)); // Calculate days difference
           
            if (dueDays > 7) {
                const dueAmount = (dueDays - 7) * 5;
                const user=await User.findById(lendedBook.userId)
                const book=await Book.findById(lendedBook.bookId)
          
                const dueBook = {
                    _id: lendedBook._id,
                    user: user.name,
                    book: book.bookName,
                    lendedDate: lendedBook.lendedDate,
                    dueDays,
                    dueAmount
                };
               
                dueBooks.push(dueBook);
            }
            console.log(dueBooks)
            response.status(200).json({ message: "Due books retrieved", dueBooks });
        });
        
        
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    searchBooks,
    getBooks,
    getLendedBooks,
    lendBook,
    addBook,
    removeBook,
    updateBook,
    getDueBooks,
};
