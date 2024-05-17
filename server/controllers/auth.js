const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("Incorrect details.");
      error.statusCode = 404;
      throw error;
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );
      res
        .status(200)
        .json({ token: token, id: user.id, username: user.username });
    } else {
      const error = new Error("Authentication failed.");
      error.statusCode = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array({ onlyFirstError: true });
      const error = new Error(errors[0].msg);
      error.statusCode = 422;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ email, username, password: hashedPassword });
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
};
