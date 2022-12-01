const { BlogPost } = require('../models');

const createBlogPost = async (title, content, userId) => {
  const newBlog = await BlogPost.create({ title, content, userId });

  return newBlog;
};

module.exports = {
  createBlogPost,
};