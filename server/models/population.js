const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Population = sequelize.define(
  "population",
  {
    year_start: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      max: 1900,
      min: -300000,
    },
    year_end: {
      type: Sequelize.INTEGER,
      allowNull: false,
      max: 1900,
      min: -300000,
    },
    population: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Population;
