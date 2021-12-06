const jwt = require('jsonwebtoken');
const model = require('../models/loginModel');

const JWT_SECRET = 'minhasupersenha';

const auth = async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ message: 'missing auth token' });
  }

  try {
    const user = await model.findUser({
      email: jwt.verify(token, JWT_SECRET).payload.email,
      password: jwt.verify(token, JWT_SECRET).payload.password,
    });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    request.user = user;

    next();
  } catch (error) {
    return response.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = auth;
