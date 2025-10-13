const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();

const sequelize = require("./util/database");
const Post = require("./models/posts");
const Country = require("./models/countries");
const Subject = require("./models/subjects");
const Topic = require("./models/topics");
const User = require("./models/users");
const Like = require("./models/likes");

const timelineRoutes = require("./routes/article");
const authRoutes = require("./routes/auth");
const widgetRoutes = require("./routes/widgets");

const app = express();

app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(helmet());
app.use(compression());

const allowedOrigins = ['https://www.tldrhistory.xyz', 'https://www.tldrhistory.onrender.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(timelineRoutes);
app.use(authRoutes);
app.use(widgetRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Internal server error.";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

Country.hasMany(Post, {
  foreignKey: "countryId",
});
Post.belongsTo(Country, {
  foreignKey: "countryId",
});
Subject.belongsToMany(Post, {
  through: Topic,
});
Post.belongsToMany(Subject, {
  through: Topic,
});
Post.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Post, {
  foreignKey: "userId",
});
Like.belongsTo(Post, { foreignKey: "postId" });
Like.belongsTo(User, { foreignKey: "userId" });
Post.hasMany(Like, { foreignKey: "postId" });

sequelize.sync().catch(() => {});

console.log("server running")

app.listen(process.env.PORT || 3000);
