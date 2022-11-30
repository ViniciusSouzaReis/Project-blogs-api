const { User } = require('../models');

const getByEmail = (email) => User.findOne({ where: { email } });

const createUser = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });

  return newUser;
};

module.exports = {
  getByEmail,
  createUser,
};
