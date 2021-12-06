const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation }) => {
  const recipe = await connection().then((db) => db.collection('recipes'));
  const { insertedId: id } = await recipe.insertOne({
    name,
    ingredients,
    preparation,
  });

  return { name, ingredients, preparation, id };
};

const getAll = () =>
  connection().then((db) => db.collection('recipes').find().toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) =>
    db.collection('recipes').findOne(new ObjectId(id)));
};

const update = (id, name, ingredients, preparation) => {
  connection().then((db) =>
    db
      .collection('recipes')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      ));

  return { _id: id, name, ingredients, preparation };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipes = await connection().then((db) => db.collection('recipes'));

  await recipes.deleteOne({ _id: ObjectId(id) });
  return id;
};

const uploadImage = async ({ id, imageURL }) => {
  if (!ObjectId.isValid(id)) return null;

  const recipeCollection = await connection().then((db) =>
    db.collection('recipes'));

  await recipeCollection.updateOne(
    { _id: ObjectId(id) },
    {
      $set: { imageURL },
    },
  );

  return id;
};

module.exports = { create, getAll, getById, update, deleteById, uploadImage };
