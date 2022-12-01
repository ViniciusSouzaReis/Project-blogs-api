const { getCategories } = require('../../services/categories.service');

const validatePostBody = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' }); 
  }

  const getCategory = await getCategories();

  const categoryArray = getCategory.map((category) => category.id);

  categoryIds.forEach((element) => {
    if (!categoryArray.includes(element)) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
  });

  return next();
};

module.exports = validatePostBody;