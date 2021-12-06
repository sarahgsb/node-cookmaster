const connect = require('./connection');

const create = async ({ name, email, password, role }) => {
  const user = await connect().then((db) => db.collection('users'));

  const { insertedId: id } = await user.insertOne({
    name,
    email,
    password,
    role,
  });

  return { name, email, password, role, id };
};

const findByEmail = async (email) => {
  const db = await connect();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = { create, findByEmail };
