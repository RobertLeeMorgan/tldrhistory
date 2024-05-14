const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Post = sequelize.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.ENUM('person', 'landmark', 'event', 'period'),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  start_year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    max: 1900,
    min: -300000
  },
  start_month: {
    type: Sequelize.INTEGER.UNSIGNED,
    max: 12,
    min: 0,
    defaultValue: 0
  },
  start_day: {
    type: Sequelize.INTEGER.UNSIGNED,
    max: 31,
    min: 0,
    defaultValue: 0
  },
  end_year: {
    type: Sequelize.INTEGER.UNSIGNED,
    max: 1950,
    min: -300000,
    defaultValue: 0
  },
  end_month: {
    type: Sequelize.INTEGER.UNSIGNED,
    max: 12,
    min: 0,
    defaultValue: 0
  },
  end_day: {
    type: Sequelize.INTEGER.UNSIGNED,
    max: 31,
    min: 0,
    defaultValue: 0
  },
  description: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  cause: {
    type: Sequelize.STRING(100),
  },
  countryId: {
    type: Sequelize.STRING(50),
    references: {
      model: "countries",
      key: "name",
    },
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    allowNull: false,
  }
}, { updatedAt: false, createdAt: true});

module.exports = Post;
