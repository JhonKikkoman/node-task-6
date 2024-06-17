/** @format */

const express = require('express');
const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title) {
    this.id = uuidv4();
    this.title = title;
    this.description = '';
    this.authors = '';
    this.favorite = '';
    this.fileCover = '';
    this.fileName = '';
  }
}

const books = [new Book('Anna'), new Book('Jhon Wick')];
const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json(books);
});
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndx = books.findIndex((elem) => elem.id === id);

  if (bookIndx !== -1) {
    res.json(books[bookIndx]);
  } else {
    res.status(404);
    res.json('404 Страница не найдена ');
  }
});

app.post('/api/books', (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(404);
    res.json('404 Не удалось добавить книгу без названия');
  }
  const newBook = new Book(title);
  books.push(newBook);
  res.status = 201;
  res.json(newBook);
});

app.post('/api/user/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(404);
    res.json('404 Укажите корректно почту');
  }
  res.status(201);
  res.json({ id: 1, mail: `${email}` });
});

app.put('/api/books/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const bookIndx = books.findIndex((elem) => elem.id === id);
  if (!title) {
    res.status(404);
    res.json('404 Не удалось обновить книгу без названия');
  }
  if (bookIndx !== -1) {
    books[bookIndx] = {
      ...books[bookIndx],
      title,
    };
    res.json(books);
  } else {
    res.status(404);
    res.json('404 Страница не найдена');
  }
});

app.delete('/api/books/:id', (req, res) => {
  const id = req.params;
  const bookIndx = books.findIndex((elem) => elem.id == id);
  if (bookIndx !== -1) {
    books.splice(bookIndx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404 Страница не найдена');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
