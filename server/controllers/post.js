const { validationResult } = require("express-validator");

const Post = require("../models/post");
const Topic = require("../models/topics");
const User = require("../models/user");
const Like = require("../models/like");

exports.postTimeline = async (req, res, next) => {
    const {
      type,
      name,
      start_year,
      start_month,
      cause,
      start_day,
      end_year,
      end_month,
      end_day,
      description,
      location,
      subjectId: subjects,
    } = req.body;
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        throw error;
      }
      const user = await User.findByPk(req.id);
      const post = await user.createPost({
        name,
        type,
        start_year,
        start_month,
        start_day,
        end_year,
        end_month,
        end_day,
        description,
        countryId: location,
        cause,
      });
      const createTopicPromises = subjects.map((subjectId) =>
        Topic.create({ postId: post.id, subjectId: subjectId })
      );
      await Promise.all(createTopicPromises);
      res.status(200).json({ message: "Post created successfully" });
    } catch (err) {
      next(err);
    }
  };
  
  exports.edit = async (req, res, next) => {
    const {
      type,
      name,
      start_year,
      start_month,
      start_day,
      end_year,
      end_month,
      end_day,
      description,
      location,
      cause,
      subjectId: subjects,
    } = req.body;
  
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      if (post.userId !== req.id) {
        return res.status(403).json({ message: "Not authorized." });
      }
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = result.array({ onlyFirstError: true });
        const error = new Error(errors[0].msg);
        error.statusCode = 422;
        throw error;
      }
      post.name = name;
      post.type = type;
      post.start_year = start_year;
      post.start_month = start_month;
      post.start_day = start_day;
      post.end_year = end_year;
      post.end_month = end_month;
      post.end_day = end_day;
      post.description = description;
      post.countryId = location;
      post.cause = cause;
      await post.save();
  
      const existingTopics = await Topic.findAll({
        where: {
          postId: post.id,
        },
      });
      const existingSubjectIds = existingTopics.map((topic) => topic.subjectId);
      const subjectsToRemove = existingSubjectIds.filter(
        (subjectId) => !subjects.includes(subjectId)
      );
      const subjectsToAdd = subjects.filter(
        (subjectId) => !existingSubjectIds.includes(subjectId)
      );
      const removePromises = existingTopics
        .filter((topic) => subjectsToRemove.includes(topic.subjectId))
        .map((topic) => topic.destroy());
      const addPromises = subjectsToAdd.map((subjectId) =>
        Topic.create({ postId: post.id, subjectId: subjectId })
      );
  
      await Promise.all([...removePromises, ...addPromises]);
      res.status(200).json({ message: "Article updated successfully" });
    } catch (err) {
      next(err);
    }
  };

exports.delete = async (req, res, next) => {
    try {
      const post = await Post.findByPk(req.body.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }
      if (post.userId !== req.id) {
        return res.status(403).json({ message: "Not authorized." });
      }
      await post.destroy();
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
  
  exports.like = async (req, res, next) => {
    try {
      const liked = await Like.findOne({
        where: { postId: req.body.id, userId: req.id },
      });
      if (!liked) {
        await Like.create({ postId: req.body.id, userId: req.id });
        res.status(201).json({ message: "Post liked successfully." });
      } else {
        await liked.destroy();
        res.status(200).json({ message: "Post unliked successfully." });
      }
    } catch (err) {
      next(err);
    }
  };
  