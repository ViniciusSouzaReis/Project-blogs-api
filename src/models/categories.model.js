module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
    {
      timestamps: false,
      underscored: true,
    });

    Categories.associate = (models) => {
      Categories.hasMany(models.PostsCategories,
      { foreignKey: 'category_id', as: 'category' });
  };

  return Categories;
};