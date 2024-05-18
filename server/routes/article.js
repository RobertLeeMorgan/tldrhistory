const express = require("express");
const router = express.Router();
const { validatePost } = require("../middleware/validatePost.js");
const isAuth = require("../middleware/isAuth");
const allowAuth = require("../middleware/allowAuth");
const Post = require("../models/posts.js");
const { check } = require("express-validator");

const timeline = require("../controllers/timeline.js");
const getAritcles = require("../controllers/get.js");
const postArticles = require("../controllers/post.js");

router.get("/api/articles", allowAuth, timeline.getTimeline);

router.get("/api/form", isAuth, getAritcles.getValues);

router.get("/api/user/:id", allowAuth, getAritcles.getUser);

router.get("/api/edit/:id", isAuth, getAritcles.getArticle);

router.post("/api/edit/:id", isAuth, validatePost, postArticles.edit);

router.post(
  "/api/post-article",
  isAuth,
  validatePost,
  check("name").custom(async (value) => {
    const existingPost = await Post.findOne({ where: { name: value } });
    if (existingPost) {
      return Promise.reject("Name already exists.");
    }
    return true;
  }),
  postArticles.postTimeline
);

router.post("/api/like", isAuth, postArticles.like);

router.delete("/api/delete", isAuth, postArticles.delete);

module.exports = router;
