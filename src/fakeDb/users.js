/** @format */

const records = [
  {
    id: 1,
    username: 'test1',
    password: 'test1',
    displayName: 'demo user',
    emails: [{ value: 'user@mail.ru' }],
  },
];

exports.findById = (id, clbk) => {
  process.nextTick(() => {
    const indx = id - 1;
    if (records[indx]) {
      clbk(null, records[indx]);
    } else {
      throw new Error(`User: ${id} does not exist`);
    }
  });
};

exports.findByUserName = (username, clbk) => {
  process.nextTick(() => {
    for (let i = 0; i < records.length; i++) {
      const user = records[i];
      if (user.username === username) {
        return clbk(null, user);
      }
      return clbk(null, null);
    }
  });
};

exports.verifyPassword = (user, password) => {
  return user.password === password;
};
