module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('projects', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    project_end: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
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
    tableName: 'projects'
  }, {
    paranoid: true
  });

  Project.associate = (models) => {
    models.projects.belongsTo(models.users, {
      onDelete: "CASCADE",
      foreignKey: "user_id"
    })
  }
  return Project;
};