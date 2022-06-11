const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,	
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    PORT: process.env.DB_PORT
  }
)

module.exports = db;
