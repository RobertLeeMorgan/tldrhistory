const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Post = require("../models/post");
const Country = require("../models/countries");
const Subject = require("../models/subjects");
const User = require("../models/user");

exports.getUser = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
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
            sequelize.literal(`exists (select 1 from Likes where Likes.postId = posts.id and Likes.userId = ${req.params.id})`)
          ],
        },
        limit: limit,
        offset: offset,
      };
      
      if (req.id) {
        queryOptions.attributes.include.push([
          sequelize.literal(`(
            SELECT CASE WHEN COUNT(*) = 1 THEN true ELSE false END AS liked
            FROM Likes
            WHERE Likes.postId = posts.id
              AND Likes.userId = ${req.id}
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
  
  exports.getValues = async (req, res, next) => {
    try {
      const countries = await Country.findAll({
        attributes: ["name"],
      });
      const subjects = await Subject.findAll();
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
            attributes: ["subject"],
            raw: true,
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