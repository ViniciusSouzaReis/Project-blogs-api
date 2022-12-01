const login = require('./controllers/login');
const getUser = require('./controllers/getUsers');
const getUserbyId = require('./controllers/getUserbyId');
const getCategory = require('./controllers/getCategories');
const getBlogPosts = require('./controllers/getBlogPosts');
const getBlogPostById = require('./controllers/getBlogPostById');

module.exports = {
  login,
  getUser,
  getUserbyId,
  getCategory,
  getBlogPosts,
  getBlogPostById,
};