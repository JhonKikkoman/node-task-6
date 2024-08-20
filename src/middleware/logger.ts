/** @format */

import { Request, Response, NextFunction} from 'express'
import { appendFile } from 'node:fs';
import { EOL } from 'node:os';

export default (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
  const { url, method } = req;
  appendFile('logs/server.log', `${date} + ${url} + ${method}` + EOL, (err: any) => {
    if (err) {
      throw  Error(err);
    }
  });
  next();
};
