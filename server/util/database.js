
const { Sequelize } = require("sequelize");
const mysql2 = require('mysql2');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  { dialect: "mysql", dialectModule: mysql2, host: process.env.MYSQL_HOST, logging: false, }
);

module.exports = sequelize;
