// const mysql = require('mysql');
// const dbKeys = require('../config/keys').mysql;
// const Sequelize = require('sequelize');
// const User = require('../api/v1/models/User');
// const sequelize = new Sequelize(dbKeys.database, dbKeys.user, dbKeys.password, {
//   host: dbKeys.host,
//   dialect: 'mysql',
//   operatorsAliases: false
// })



// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been made to the database');
//   })
//   .catch(err => {
//     console.log(err);
//   });




// module.exports = sequelize;

const db = mysql.createConnection({
  host: dbKeys.host,
  user: dbKeys.user,
  password: dbKeys.password,
  database: dbKeys.database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected');
})

module.exports = db;