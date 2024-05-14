const express = require("express");
const router = express.Router();

const widgets = require("../controllers/widgets.js");

router.get("/api/population", widgets.getPopulation);

router.get("/api/popular", widgets.getPopular);

router.get("/api/civil", widgets.getCivil);

module.exports = router;
