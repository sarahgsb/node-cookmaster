const { ObjectId } = require('mongodb');
const model = require('../models/recipesModel');

const message = 'recipe not found';

const isValidRecipe = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;
  return true;
};

const create = async ({ name, ingredients, preparation }) => {
  if (!isValidRecipe(name, ingredients, preparation)) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }

  const { id } = await model.create({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return {
      message,
      status: 404,
    };
  }

  const recipe = await model.getById(id);
  if (!recipe) {
    return {
      message,
      status: 404,
    };
  }

  return recipe;
};

const update = async ({ name, ingredients, preparation }, id) => {
  const recipe = await model.update({ name, ingredients, preparation }, id);
  if (!recipe) {
    return {
      message: 'recipe not found',
      status: 404,
    };
  }
  return {
    name,
    ingredients,
    preparation,
    id,
  };
};

const deleteById = async (id) => {
  const recipe = await model.deleteById(id);
  if (!recipe) {
    return {
      message: 'recipe not found',
      status: 404,
    };
  }

  return recipe;
};

const upload = async ({ id }) => {
  const imageURL = `localhost:3000/src/uploads/${id}.jpeg`;
  const recipe = await model.uploadImage({ imageURL, id });

  if (!recipe) {
    return {
      message: 'recipe not found',
      status: 404,
    };
  }
  return recipe;
};

module.exports = { create, getById, update, deleteById, upload };
