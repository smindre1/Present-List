const Sequelize = require('sequelize');
const mysql2 = require('mysql2'); // Needed to fix sequelize issues with WebPack
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectModule: mysql2,
      port: 3306
    }
  );
}

module.exports = sequelize;
