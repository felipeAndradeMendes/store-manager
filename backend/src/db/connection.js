const mysql = require('mysql2/promise');
// require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOSTNAME,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
});

// const connection = mysql.createPool({
//   host: 'db',
//   port: 3306,
//   user: 'root',
//   password: 'password',
//   database: 'StoreManager',
//   waitForConnections: true,
// });

module.exports = connection;