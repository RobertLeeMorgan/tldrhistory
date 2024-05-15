const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const User = require("../models/user");

const userController = require("../controllers/auth.js");

router.post(
  "/api/register",
  [
    check("username", "Username must be at least 5 characters.")
      .isLength({
        min: 5,
      })
      .trim(),
    check("email", "Please enter a valid email.")
      .isEmail()
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject("Email address is already in use.");
        }
        return true;
      })
      .normalizeEmail(),
    check(
      "password",
    )
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters.")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).withMessage("Must contain at least one uppercase letter and a digit.")
      .trim(),
    check("confirmation")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match.");
        }
        return true;
      }),
  ],
  userController.register
);

router.post("/api/login", userController.login);

module.exports = router;
