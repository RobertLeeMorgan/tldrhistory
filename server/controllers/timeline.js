const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Post = require("../models/posts");
const Country = require("../models/countries");
const Subject = require("../models/subjects");
const User = require("../models/users");

exports.getTimeline = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    let filter = JSON.parse(req.query.filter);

    const queryOptions = {
      order: [],
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
      where: {},
      limit: limit,
      offset: offset,
    };
    if (filter.type.length) {
      queryOptions.where.type = filter.type;
    }
    if (filter.subject.length) {
      queryOptions.include[1].where = { subject: filter.subject };
    }
    if (filter.year_start.length && filter.year_end.length) {
      queryOptions.where.start_year = {
        [Sequelize.Op.gte]: filter.year_start,
        [Sequelize.Op.lte]: filter.year_end,
      };
    }
    if (filter.continent.length) {
      queryOptions.include[0].where = { continent: filter.continent };
    }
    if (filter.search.length) {
      queryOptions.where[Sequelize.Op.or] = [
        { name: { [Sequelize.Op.like]: `%${filter.search}%` } },
        { description: { [Sequelize.Op.like]: `%${filter.search}%` } },
      ];
      queryOptions.order = {};
    }
    if (filter.sortBy) {
      queryOptions.order = [
        ["start_year", "ASC"],
        ["start_month", "ASC"],
        ["start_day", "ASC"],
      ];
    } else {
      queryOptions.order = [
        ["start_year", "DESC"],
        ["start_month", "DESC"],
        ["start_day", "DESC"],
      ];
    }
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
