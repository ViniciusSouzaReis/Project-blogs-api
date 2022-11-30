const login = require('./controllers/login');
const getUser = require('./controllers/getUsers');
const getUserbyId = require('./controllers/getUserbyId');
const getCategory = require('./controllers/getCategories');

module.exports = {
  login,
  getUser,
  getUserbyId,
  getCategory,
};