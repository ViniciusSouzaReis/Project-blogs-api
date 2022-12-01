const { BlogPost, User, Category } = require('../models');

const createBlogPost = async (title, content, userId) => {
  const newBlog = await BlogPost.create({ title, content, userId });

  return newBlog;
};

const getBlogPosts = () => BlogPost.findAll(
  {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  },
);

module.exports = {
  createBlogPost,
  getBlogPosts,
};