const model = require('../models/loginModel');

const isValidUser = (email, password) => {
  if (!email || !password) return false;
  return true;
};

const isValidEmail = (email) => {
  // Regex em https://grabthiscode.com/javascript/javascript-regex-email
  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) return false;
  return true;
};

const isValidPassword = (login, Password) => {
  if (!login) return false;

  const { password } = login;

  if (password !== Password) return false;

  return true;
};

const find = async ({ email, password }) => {
  if (!isValidUser(email, password)) {
    return { message: 'All fields must be filled', status: 401 };
  }

  if (!isValidEmail(email)) {
    return { message: 'Incorrect username or password', status: 401 };
  }

  const login = await model.findUser({ email, password });

  if (!isValidPassword(login, password)) {
    return { message: 'Incorrect username or password', status: 401 };
  }

  return login;
};

module.exports = {
  find,
};
