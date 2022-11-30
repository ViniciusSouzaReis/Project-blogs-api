const login = require('./controllers/login');
const getUser = require('./controllers/getUsers');
const getUserbyId = require('./controllers/getUserbyId');

module.exports = {
  login,
  getUser,
  getUserbyId,
};