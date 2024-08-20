/** @format */

import process from 'process';

type mailT = {
  value: string;
}

export interface userT {
  id: number,
  username: string,
  password: string,
  displayName: string,
  emails: mailT[],
}

const records: userT[] = [
  {
    id: 1,
    username: 'test1',
    password: 'test1',
    displayName: 'demo user',
    emails: [{ value: 'user@mail.ru' }],
  },
];

type clbkSignature = {
  (error: typeof Error | null, user: userT | false): void;
 }

export function findById(id: number, clbk: clbkSignature) {
  process.nextTick(() => {
    const indx = id - 1;
    if (records[indx]) {
      clbk(null, records[indx]);
    } else {
      throw new Error(`User: ${id} does not exist`);
    }
  });
}

export function findByUserName(username : string, clbk: clbkSignature ){
  process.nextTick(() => {
    for (let i = 0; i < records.length; i++) {
      const user = records[i];
      if (user.username === username) {
        return clbk(null, user);
      }
      return clbk(null, null);
    }
  });
}

export function verifyPassword(user: userT, password: string) {
  return user.password === password;
}
