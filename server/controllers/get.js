const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Post = require("../models/posts");
const Country = require("../models/countries");
const Subject = require("../models/subjects");
const User = require("../models/users");

exports.getUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const offset = (page - 1) * limit;

    const queryOptions = {
      order: [
        ["start_year", "ASC"],
        ["start_month", "ASC"],
        ["start_day", "ASC"],
      ],
      attributes: {
        exclude: ["end_year", "end_month", "end_day"],
        include: [
          [
            sequelize.literal(
              'CONCAT(start_year, "-", start_month, "-", start_day)'
            ),
            "start",
          ],
          [
            sequelize.literal('CONCAT(end_year, "-", end_month, "-", end_day)'),
            "end",
          ],
        ],
      },
      include: [
        { model: Country, attributes: ["continent"], raw: true },
        {
          model: Subject,
          through: {
            attributes: [],
          },
          attributes: ["subject"],
          raw: true,
          as: "subjects",
        },
        { model: User, attributes: ["username"], raw: true },
      ],
      where: {
        [Sequelize.Op.or]: [
          { userId: req.params.id },
          sequelize.literal(
            `exists (select 1 from likes where likes.postId = posts.id and likes.userId = ${req.params.id})`
          ),
        ],
      },
      limit: limit,
      offset: offset,
    };

    if (req.id) {
      queryOptions.attributes.include.push([
        sequelize.literal(`(
            SELECT CASE WHEN COUNT(*) = 1 THEN true ELSE false END AS liked
            FROM likes
            WHERE likes.postId = posts.id
              AND likes.userId = ${req.id}
          )`),
        "liked",
      ]);
    }

    const posts = await Post.findAll(queryOptions);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getUsername = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['username'],
      raw: true
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getValues = async (req, res, next) => {
  try {
    const countries = await Country.findAll({
      attributes: ["name"],
    });
    const subjects = await Subject.findAll({ order: [["id", "ASC"]] });
    res.json({ countries, subjects });
  } catch (err) {
    next(err);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Subject,
          through: {
            attributes: [],
          },
          as: "subjects",
        },
      ],
    });
    if (!article) {
      const error = new Error("Article not found.");
      error.statusCode = 404;
      throw error;
    }
    res.json(article);
  } catch (err) {
    next(err);
  }
};
