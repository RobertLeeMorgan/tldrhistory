const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Country = sequelize.define("countries", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  continent: {
    type: Sequelize.ENUM(
      "Africa",
      "Antartica",
      "Asia",
      "Europe",
      "Middle East",
      "North America",
      "Oceania",
      "South America"
    ),
    allowNull: false,
  }
}, {timestamps: false});

module.exports = Country;
