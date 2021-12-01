const model = require('../models/userModel');

const isValidUser = (name, email, password) => {
  if (!name || !email || !password) return false;

  // Regex em https://grabthiscode.com/javascript/javascript-regex-email
  return email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
};

const userRole = (_role, path) => {
    if (path.includes('admin')) {
      return 'admin';
    }
    return 'user';
  };

const createUser = async ({ name, email, password, role }) => {
  const user = await model.findByEmail(email);

  if (!isValidUser(name, email, password)) {
    return { message: 'Invalid entries. Try again.', status: 400 };
  }

  if (user) {
    return { message: 'Email already registered', status: 400 };
  }

  const { id } = await model.create({
    name,
    email,
    password,
    role,
  });
  return { id, name, email, password, role };
};

module.exports = { createUser, userRole };
