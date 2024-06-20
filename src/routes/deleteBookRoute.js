/** @format */

const express = require('express');
const data = require('../data/data');

const router = express.Router();

router.delete('/api', (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((elem) => elem.id === id);
  if (bookIndx !== -1) {
    data.splice(bookIndx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json('404 Страница не найдена1');
  }
});

module.exports = router;
