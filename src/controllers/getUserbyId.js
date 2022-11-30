const { UserService } = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await UserService.getByUserId(id);

    if (!users) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};