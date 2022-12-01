const { BlogPostService } = require('../services');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await BlogPostService.getByPostId(id);

    if (!categories) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(categories);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários no banco', error: err.message });
  }
};