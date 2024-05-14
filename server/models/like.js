const Sequelize = require("sequelize");

const sequelize = require("../util/database");


const Like = sequelize.define("like", {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "user",
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
  
  module.exports = Like;