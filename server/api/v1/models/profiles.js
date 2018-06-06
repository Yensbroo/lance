module.exports = function (sequelize, DataTypes) {
  const Profile = sequelize.define('profiles', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    headline: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bio: {
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
      },
    }
  }, {
    tableName: 'profiles'
  });

  Profile.associate = (models) => {
    models.profiles.hasMany(models.reviews, {
      foreignKey: 'profile_id'
    });

    models.profiles.belongsTo(models.users, {
      foreignKey: 'user_id'
    })
  }

  return Profile;
};