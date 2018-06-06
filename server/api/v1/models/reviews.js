/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('reviews', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW

    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    profile_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    }
  }, {
    tableName: 'reviews'
  });

  Review.associate = (models) => {
    models.reviews.belongsTo(models.users, {
      foreignKey: 'user_id'
    });

    models.reviews.belongsTo(models.profiles, {
      foreignKey: 'profile_id'
    })
  }

  return Review;
};