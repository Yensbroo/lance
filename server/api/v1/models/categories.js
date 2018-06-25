/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('categories', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'categories'
  });

  Category.associate = (models) => {
    models.categories.hasMany(models.projects, {
      foreignKey: 'category_id'
    })
  }

  return Category;
};