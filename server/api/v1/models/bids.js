/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Bid = sequelize.define('bids', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    price: {
      type: DataTypes.INTEGER(11),
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
    project_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    }
  }, {
    tableName: 'bids'
  });

  Bid.associate = (models) => {
    models.bids.belongsTo(models.users, {
      foreignKey: 'user_id'
    });

    models.bids.belongsTo(models.projects, {
      foreignKey: 'project_id'
    })
  }

  return Bid;
};