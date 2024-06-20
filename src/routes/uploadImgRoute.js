/** @format */

const express = require('express');
const fileMulter = require('../middleware/uploadFile');
const data = require('../data/data');

const router = express.Router();

router.post('/api', fileMulter.single('book'), (req, res) => {
  const { id } = req.params;
  const bookIndx = data.findIndex((el) => el.id === id);
  if (req.file && bookIndx !== -1) {
    const { path } = req.file;
    data[bookIndx].fileBook = path;
    res.json(data[bookIndx]);
  }
  res.json();
});

module.exports = router;
