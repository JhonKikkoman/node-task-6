/** @format */

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const absolutePath = path.resolve('./src/public/books');

const storage = multer.diskStorage({
  destination(req, file, clbk) {
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
      console.log(absolutePath);
    }
    clbk(null, absolutePath);
  },
  filename(req, file, clbk) {
    const uniqKey = Math.random().toString(32).substring(2);
    clbk(null, `${uniqKey}-${file.originalname}`);
  },
});

export default multer({ storage });
