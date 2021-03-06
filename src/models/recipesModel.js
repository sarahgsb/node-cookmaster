const { ObjectId } = require('mongodb');
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

const getAll = () =>
  connect().then((db) => db.collection('recipes').find().toArray());

// const getById = (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   return connect().then((db) =>
//     db.collection('recipes').findOne(new ObjectId(id)));
// };

const getById = async (id) => {
  const recipe = await connect().then((db) => db.collection('recipes'));
  const recipes = await recipe.findOne({ _id: ObjectId(id) });
  return recipes;
};

// const update = (id, name, ingredients, preparation) => {
//   connect().then((db) =>
//     db
//       .collection('recipes')
//       .updateOne(
//         { _id: ObjectId(id) },
//         { $set: { name, ingredients, preparation } },
//       ));

//   return { _id: id, name, ingredients, preparation };
// };

const update = async ({ name, ingredients, preparation }, id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipe = await connect().then((db) =>
    db.collection('recipes'));

  await recipe.updateOne(
    { _id: ObjectId(id) },
    {
      $set: { name, ingredients, preparation },
    },
  );

  return {
    name,
    ingredients,
    preparation,
    id,
  };
};

const deleteById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const recipes = await connect().then((db) => db.collection('recipes'));

  await recipes.deleteOne({ _id: ObjectId(id) });
  return id;
};

const uploadImage = async ({ id, imageURL }) => {
  if (!ObjectId.isValid(id)) return null;

  const recipe = await connect().then((db) => db.collection('recipes'));

  await recipe.updateOne(
    { _id: ObjectId(id) },
    {
      $set: { imageURL },
    },
  );

  return id;
};

module.exports = { create, getAll, getById, update, deleteById, uploadImage };
