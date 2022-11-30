module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {},
    {
      timestamps: false,
      underscored: true, 
      tableName: 'posts_categories'
    },
  );

  PostsCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId', 
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'blogposts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
    return PostsCategories;
};