const connection = require('./connection');

const findUser = async ({ email, password }) =>
  connection().then((db) => db.collection('users').findOne({ email, password }));

module.exports = findUser;
