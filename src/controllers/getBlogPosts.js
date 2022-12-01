const { BlogPostService } = require('../services');

module.exports = async (_req, res) => {
  try {
    const categories = await BlogPostService.getBlogPosts();

    if (!categories) throw Error;

    res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};