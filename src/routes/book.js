/** @format */

const express = require('express');
const fileMulter = require('../middleware/uploadFile');
const router = express.Router();
const dir = require('../index');
const bookSchema = require('../models/books');

// все книги
router.get('/books', async (req, res) => {
  try {
    const books = await bookSchema.find().select('-__v');
    res.json(books);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// книга по ID
router.get('/book/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookSchema.findById(id).select('-__v');
    if (book === null) {
      res.json('Code: 404');
    }
    res.json(book);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// создать(добавить) книгу
router.post('/addBook', async (req, res) => {
  const { title, description } = req.body;
  const newBook = new bookSchema({
    title,
    description,
  });
  try {
    await newBook.save();
    res.json(newBook);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// логин
router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404);
    res.json('404 Укажите корректно почту');
  }
  res.status(201);
  res.json({ id: 1, mail: `${email}` });
});

// обновить книгу
router.put('/updateBook/:id', async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const book = await bookSchema.findByIdAndUpdate(id, { title, description });
    if (book === null) {
      res.json('Code: 404');
    }
    res.redirect(`http://localhost:3000/index/${id}`);
  } catch (e) {
    res.json(500);
    res.json(e);
  }
});

// удалить книгу
router.delete('/deleteBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await bookSchema.deleteOne({ _id: id });
    res.json(true);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// загрузка книги на сервер
router.post('/uploadBook/:id', fileMulter.single('book'), (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (req.file && bookIndx !== -1) {
    const { path } = req.file;
    data[bookIndx].fileBook = path;
    res.json(data[bookIndx]);
  }
  res.json();
});

// загрузка книги на клиент
router.get('/downloadBook/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (bookIndx !== -1) {
    res.status(200);
    res.download(`${dir}\/${data[bookIndx].fileBook}`, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  } else {
    res.status(404);
    res.json('404 Страница не найдена1');
  }
});

module.exports = router;
