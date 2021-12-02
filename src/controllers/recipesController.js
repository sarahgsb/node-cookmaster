const service = require('../services/recipesService');

const create = async (request, response) => {
  const { name, ingredients, preparation } = request.body;

  const { message, id } = await service.create({
    name,
    ingredients,
    preparation,
  });

  if (message) {
    return response.status(400).json({ message });
  }

  return response
    .status(201)
    .json({ recipe: { name, ingredients, preparation, _id: id } });
};

module.exports = { create };
