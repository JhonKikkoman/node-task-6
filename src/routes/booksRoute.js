/** @format */

const express = require('express');
const router = express.Router();
const data = require('../data/data');

router.get('/api', (req, res) => {
  res.json(data);
});

module.exports = router;
