const { check } = require("express-validator");
const Country = require("../models/countries");
const Subject = require("../models/subjects");
const { getMaxDays } = require("../util/dateValidation.js");

const validatePost = [
  check("type").custom((value) => {
    console.log(value);
    const types = ["person", "landmark", "event", "period"];
    if (!types.includes(value)) {
      throw new Error("Type of article not recognised.");
    }
    return true;
  }),
  check("name", "Please enter a valid name.")
    .isLength({ min: 4 })
    .isString()
    .escape()
    .trim(),
  check("description", "Description should be between 10 and 250 characters.")
    .isLength({ min: 4, max: 250 })
    .isString()
    .escape()
    .trim(),
  check("start_year").isNumeric({ min: -300000, max: 1900 }).trim(),
  check("start_month").isNumeric({ min: 0, max: 12 }).trim(),
  check("start_day")
    .isNumeric({ min: 0, max: 31 })
    .trim()
    .custom((value, { req }) => {
      const year = parseInt(req.body.start_year);
      const month = parseInt(req.body.start_month);
      const maxDays = getMaxDays(year, month);
      if (isNaN(value) || value < 0 || value > maxDays) {
        throw new Error(`Invalid start day for ${year}-${month}`);
      }
      return true;
    }),
  check("end_year").isNumeric({ min: -300000, max: 1950 }).trim(),
  check("end_month").isNumeric({ min: 0, max: 12 }).trim(),
  check("end_day")
    .isNumeric({ min: 0, max: 31 })
    .trim()
    .custom((value, { req }) => {
      const year = parseInt(req.body.end_year);
      const month = parseInt(req.body.end_month);
      const maxDays = getMaxDays(year, month);
      if (isNaN(value) || value < 0 || value > maxDays) {
        throw new Error(`Invalid end day for ${year}-${month}`);
      }
      return true;
    }),
  check("location").custom(async (value) => {
    const country = await Country.findOne({ where: { name: value } });
    if (!country) {
      return Promise.reject("Location not recognised.");
    }
    return true;
  }),
  check("cause", "Please enter a valid cause.")
    .isString()
    .isLength({ min: 1, max:100 })
    .trim()
    .escape(),
  check("subjectId", "Subject not recognised").custom(async (value) => {
    const foundSubjects = await Subject.findAll({
      where: { id: value },
    });
    if (foundSubjects.length !== value.length) {
      return Promise.reject("Subject not recognised.");
    }
    return true;
  }),
];

module.exports = {
  validatePost,
};
