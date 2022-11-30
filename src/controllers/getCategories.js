const { CategoriesService } = require('../services');

module.exports = async (_req, res) => {
  try {
    const categories = await CategoriesService.getCategories();

    if (!categories) throw Error;

    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};