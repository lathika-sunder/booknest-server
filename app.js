const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./db/connect');
const booksRouter = require('./routes/booksRouter');
const usersRouter=require('./routes/usersRouter')

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());


app.get('/api/v1/booknest', (req, res) => {
    res.send("Welcome to Booknest's Server");
});


app.use('/api/v1/booknest/user', usersRouter);
app.use('/api/v1/booknest/book', booksRouter);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
