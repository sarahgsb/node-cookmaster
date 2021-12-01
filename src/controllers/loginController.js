const jwt = require('jsonwebtoken');
const service = require('../services/loginService');

const JWT_SECRET = 'minhasupersenha';

const findUser = async (request, response) => {
  const { email, password } = request.body;

  const { message } = await service.find({ email, password });

  if (message) {
    return response.status(401).json({ message });
  }

  const user = await service.find({ email, password });

  const token = jwt.sign({ payload: user }, JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return response.status(200).json({ token });
};

module.exports = {
  findUser,
};
