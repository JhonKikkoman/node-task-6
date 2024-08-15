/** @format */

import { appendFile } from 'node:fs';
import { EOL } from 'node:os';

export default (req, res, next) => {
  const date = new Date();
  const { url, method } = req;
  appendFile('logs/server.log', `${date} + ${url} + ${method}` + EOL, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  next();
};
