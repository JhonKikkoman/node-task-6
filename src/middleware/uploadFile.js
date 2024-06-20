/** @format */

const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, clbk) {
    clbk(null, 'public/books');
  },
  filename(req, file, clbk) {
    clbk(null, `${Date.now()}-${file.originalname}`);
  },
});

module.exports = multer({ storage });
