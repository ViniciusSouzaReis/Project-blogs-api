module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      underscored: true,
    });

    Category.associate = (models) => {
      Category.hasMany(models.PostsCategories,
      { foreignKey: 'category_id', as: 'category' });
  };

  return Category;
};