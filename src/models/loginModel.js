const connect = require('./connection');

const findUser = async ({ email, password }) =>
  connect().then((db) => db.collection('users').findOne({ email, password }));

module.exports = { findUser };
