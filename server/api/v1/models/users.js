const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email_confirmed: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    confirmation_token: {
      type: DataTypes.STRING(25),
      allowNull: true,
      unique: true
    },
    remember_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    email_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    confirmation_token: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'users'
  }, {
    paranoid: true
  });

  User.associate = (models) => {
    models.users.belongsTo(models.roles, {
      foreignKey: 'role_id'
    });

    models.users.hasMany(models.projects, {
      foreignKey: 'user_id'
    })

    models.users.hasOne(models.profiles, {
      foreignKey: 'user_id'
    })
  }

  User.beforeCreate((user, options) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return reject(err);
          user.password = hash
          return resolve(user, options);
        })
      })
    })
  });
  return User;
};