const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Post = require("../models/posts");
const Country = require("../models/countries");
const Subject = require("../models/subjects");
const Like = require("../models/likes");
const Population = require("../models/population");

exports.getPopulation = async (req, res, next) => {
  try {
    const population = await Population.findAll({});
    res.json({ population });
  } catch (err) {
    next(err);
  }
};

exports.getPopular = async (req, res, next) => {
  try {
    const { year } = req.query;

    if (isNaN(year)) {
      return res.status(200);
    }

    const centuryStartYear = Math.floor(year / 100) * 100;
    const centuryEndYear = centuryStartYear + 99;

    const popular = await Like.findAll({
      attributes: [
        "postId",
        [sequelize.fn("COUNT", sequelize.col("postId")), "likes"],
      ],
      group: ["postId"],
      order: [[sequelize.literal("likes"), "DESC"]],
      limit: 1,
      include: [
        {
          model: Post,
          where: {
            start_year: { [Sequelize.Op.gte]: centuryStartYear },
            start_year: { [Sequelize.Op.lte]: centuryEndYear },
          },
          attributes: ["name", "type"],
          raw: true,
        },
      ],
      raw: true,
    });
    res.json(popular);
  } catch (err) {
    next(err);
  }
};

exports.getCivil = async (req, res, next) => {
  try {
    const civil = await Post.findAll({
      where: {
        type: "period",
      },
      attributes: ["start_year", "end_year", "name"],
      order: [[sequelize.literal("continent"), "ASC"]],
      include: [
        { model: Country, attributes: ["continent"], raw: true },
        {
          model: Subject,
          where: {
            subject: "culture",
          },
          through: { attributes: [] },
          attributes: [],
          raw: true,
        },
      ],
    });
    res.json({ civil });
  } catch (err) {
    next(err);
  }
};
