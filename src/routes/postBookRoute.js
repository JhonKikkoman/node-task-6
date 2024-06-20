/** @format */

const express = require('express');
const Book = require('../data/entityBook');
const data = require('../data/data');

const router = express.Router();

router.post('/api', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(404);
    res.json('404 Не удалось добавить книгу без названия');
  }
  const newBook = new Book(title);
  data.push(newBook);
  res.status = 201;
  res.json(newBook);
});

module.exports = router;
