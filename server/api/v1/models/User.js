// const sequelize = require('../../../config/dbConnection');
// const Sequelize = require('sequelize');

// const User = sequelize.define('user', {
//   id: {
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   name: {
//     type: Sequelize.STRING,
//     notEmpty: true
//   },
//   email: {
//     type: Sequelize.STRING,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   deletedAt: {
//     type: Sequelize.DATE
//   }
// })