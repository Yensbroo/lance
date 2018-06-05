/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
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
    tableName: 'roles'
  });

  Role.associate = (models) => {
    models.roles.hasMany(models.users, {
      foreignKey: 'role_id'
    })
  }

  return Role;
};