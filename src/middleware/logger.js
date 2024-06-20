/** @format */

const fs = require('node:fs');
const os = require('node:os');

module.exports = (req, res) => {
  const date = new Date();
  const { url, method } = req;
  fs.appendFile(
    'logs/server.log',
    `${date} + ${url} + ${method}` + os.EOL,
    (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
};
