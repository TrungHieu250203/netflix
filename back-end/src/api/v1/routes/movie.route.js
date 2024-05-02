const express = require('express');
const router = express.Router();

const controller = require("../controllers/movie.controller");
const authenticateToken = require("../../../middlewares/authenticate");

router.get("/", controller.getAllMovies);

router.get("/series", controller.getAllSeries);

router.get("/feature-films", controller.getAllFeatureFilms);

router.get("/tv-shows", controller.getAllTVShows);

router.get("/animated", controller.getAllAnimatedMovies);

router.get("/detail/:slug", controller.getMovieDetailsWithComments);

router.post("/detail/:slug/comments/create", authenticateToken, controller.createComment);

router.delete("/detail/:slug/comments/:id", authenticateToken, controller.deleteComment);

router.get("/genre/:genre", controller.getMoviesByGenre);

router.get("/country/:country", controller.getMoviesByCountry);

module.exports = router;