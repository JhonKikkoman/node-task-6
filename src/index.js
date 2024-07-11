/** @format */

const dir = __dirname;
module.exports = dir;
const express = require('express');

const err404 = require('./middleware/err404');
const logger = require('./middleware/logger');

const booksRouter = require('./routes/book');
const viewsRouter = require('./routes/viewsRoute');
const counterRouter = require('./routes/counter');

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.set('views', './src/views');
app.set('view engine', 'ejs');

// app.use('/', logger);

app.use('/api', booksRouter);

app.use('/index', viewsRouter);

app.use('/counter', counterRouter);

app.use(err404);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('server stared on http://localhost:' + PORT + '/index');
});
