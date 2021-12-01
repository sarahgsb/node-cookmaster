const service = require('../services/userService');

const create = async (request, response) => {
  const { name, email, password, role } = request.body;
  const { path } = request;

  const { message } = await service.createUser({ name, email, password, role });

  if (message === 'Invalid entries. Try again.') {
    return response.status(400).json({ message });
  }

  if (message === 'Email already registered') {
    return response.status(409).json({ message });
  }

  response.status(201).json({
    user: {
      name,
      email,
      role: service.userRole(role, path),
    },
  });
};

module.exports = { create };
