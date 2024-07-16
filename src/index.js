/** @format */

const dir = __dirname;
module.exports = dir;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

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

async function start(PORT) {
  try {
    await mongoose
      .connect('mongodb://ec9aacc37eeb:27017', {
        dbName: 'books',
      })
      .then(() => console.log('-----------Connected to DB-----------'));
    app.listen(PORT, () => {
      console.log('server stared on http://localhost:' + PORT + '/index');
    });
  } catch (e) {
    console.log(e);
  }
}

const PORT = process.env.PORT || 3000;
start(PORT);
