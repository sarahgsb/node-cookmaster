// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const create = async ({ name, ingredients, preparation }) => {
  const recipe = await connect().then((db) => db.collection('recipes'));
  const { insertedId: id } = await recipe.insertOne({
    name,
    ingredients,
    preparation,
  });

  return { name, ingredients, preparation, id };
};

module.exports = { create };
