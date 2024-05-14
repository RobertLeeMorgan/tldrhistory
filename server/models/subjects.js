const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Subject = sequelize.define("subjects", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  subject: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {timestamps: false});

module.exports = Subject;
