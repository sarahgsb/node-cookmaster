const express = require('express');
const multer = require('multer');
const service = require('../services/recipesService');
const model = require('../models/recipesModel');
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, './src/uploads');
  },
  filename: (request, _file, callback) => {
    const { id } = request.params;
    const file = `${id}.jpeg`;
    callback(null, file);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', auth, async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { _id: userId } = request.user;

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
    .json({ recipe: { name, ingredients, preparation, userId, _id: id } });
});

router.get('/', async (_request, response) => {
  const recipes = await model.getAll();

  if (!recipes) {
    return response.status(404).json({ message: 'Nenhuma receita encontrada' });
  }
  return response.status(200).json(recipes);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const recipe = await service.getById(id);

  if (recipe.message) {
    return response.status(404).json({ message: 'recipe not found' });
  }
  return response.status(200).json(recipe);
});

router.put('/:id', auth, async (request, response) => {
  const { name, ingredients, preparation } = request.body;
  const { id } = request.params;
  const { _id: userId } = request.user;

  const { message } = await service.update(
    {
      name,
      ingredients,
      preparation,
    },
    id,
  );

  if (message) {
    return response.status(400).json({ message });
  }

  return response
    .status(200)
    .json({ _id: id, name, ingredients, preparation, userId });
});

router.delete('/:id', auth, async (request, response) => {
  const { id } = request.params;

  const { message } = await service.deleteById(id);
  if (message) {
    return response.status(400).json({ message });
  }

  return response.status(204).json(id);
});

router.put(
  '/:id/image',
  auth,
  upload.single('image'),
  async (request, response) => {
    const { id } = request.params;
    const { path: pathFile } = request.file;
    const { _id: userId } = request.user;
    const { _id, name, ingredients, preparation, message } = await service.getById(id);

    if (message) {
      return response.status(400).json({ message });
    }

    await service.upload(id, `localhost:3000/${pathFile}`);
    return response
      .status(200)
      .json({
        _id,
        name,
        ingredients,
        preparation,
        userId,
        image: `localhost:3000/${pathFile}`,
      });
  },
);

module.exports = router;
