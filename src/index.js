/** @format */

const dir = __dirname;
module.exports = dir;
const express = require('express');

const err404 = require('./middleware/err404');
const logger = require('./middleware/logger');

const booksRouter = require('./routes/booksRoute');
const getBookId = require('./routes/getBookRoute');
const postBook = require('./routes/postBookRoute');
const login = require('./routes/loginRoute');
const updateBook = require('./routes/updateBookRoute');
const deleteBook = require('./routes/deleteBookRoute');
const upload = require('./routes/uploadImgRoute');
const download = require('./routes/dowloadRoute');

const app = express();

app.use(logger); // этот middleware должен быть в начале т.к. Express выбирает первый совпавший маршрут.
app.use('/upload/book/:id', upload); // роут с middleware для загрузки пути к книге по ID в свойстве fileBook
app.use('/books/:id/download', download); // загрузка книги
app.use('/books', booksRouter); // получить все книги
app.use('/books/:id', getBookId); // получить одну книгу по ID
app.use('/books', postBook); // добавить книгу
app.use('/user/login', login); // логин
app.use('/books/:id', updateBook); // обновить книгу по ID
app.use('/books/:id', deleteBook); // удалить книгу
app.use(err404); // middleware для обработки не существующих роутов

const PORT = process.env.PORT || 3000;
app.listen(PORT);
