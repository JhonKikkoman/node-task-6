/** @format */

const express = require('express');
const fileMulter = require('../middleware/uploadFile');
const router = express.Router();
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
router.post('/uploadBook/:id', fileMulter.single('book'), async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  try {
    const book = await bookSchema.findByIdAndUpdate(id, {
      $set: { fileName: path },
    });
    res.status(201);
    res.json(book);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

// загрузка книги на клиент
router.get('/downloadBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookSchema.findById(id).select('-__v');
    res.download(book.fileName);
  } catch (e) {
    res.status(500);
    res.json(e);
  }
});

module.exports = router;
