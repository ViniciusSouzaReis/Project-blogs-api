const { PostCategory } = require('../models');

const createPostsCategories = async (postId, categoryId) => {
  const newPostCategory = await PostCategory.create({ postId, categoryId });

  return newPostCategory;
};

module.exports = {
  createPostsCategories,
};