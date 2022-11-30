const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

const getByUserId = (userId) => User.findByPk(userId);

const getUsers = () => User.findAll({
  attributes: ['id', 'displayName', 'email', 'image'],
});

module.exports = {
  getByEmail,
  createUser,
  getByUserId,
  getUsers,
};
