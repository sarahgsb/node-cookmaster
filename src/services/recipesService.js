const model = require('../models/recipesModel');

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

module.exports = { create };
