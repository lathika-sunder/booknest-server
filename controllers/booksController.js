const Book =require('../models/bookModel')

const searchBooks = async (request, response) => {
    const { genre,author } = request.body
    
    try {
        const result = await Bus.find({
            $or: [
                { genre: genre }
            ],
            $or: [
                { author:author }
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


const getLendedBooks = (req, res) => {
    // Logic to get lended books
    res.send('Lended books retrieved');
};

const viewDues = (req, res) => {
    // Logic to view dues
    res.send('Dues viewed');
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


const removeBook = (req, res) => {
    // Logic to remove a book
    res.send('Book removed');
};

const updateBook = (req, res) => {
    // Logic to update a book
    res.send('Book updated');
};

const getDueBooks = (req, res) => {
    // Logic to get books with dues
    res.send('Books with dues retrieved');
};

module.exports = {
    searchBooks,
    getBooks,
    getLendedBooks,
    viewDues,
    addBook,
    removeBook,
    updateBook,
    getDueBooks
};
