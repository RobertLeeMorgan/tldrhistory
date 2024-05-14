const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Topic = sequelize.define("topics", {
  subjectId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: "subjects",
      key: "id",
    },
  },
  postId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: "posts",
      key: "id"
    }
  }
}, {timestamps: false});

module.exports = Topic;
