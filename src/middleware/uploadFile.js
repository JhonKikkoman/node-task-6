/** @format */

const multer = require('multer');
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

const storage = multer.diskStorage({
  destination(req, file, clbk) {
    const absolutePath = path.join(__dirname, '../public/books');
    if (!existsSync(absolutePath)) {
      mkdirSync(absolutePath, { recursive: true });
    }
    clbk(null, absolutePath);
  },
  filename(req, file, clbk) {
    const uniqKey = Math.random().toString(32).substring(2);
    clbk(null, `${uniqKey}-${file.originalname}`);
  },
});

module.exports = multer({ storage });
