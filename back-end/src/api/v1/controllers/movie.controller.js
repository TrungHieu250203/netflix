const MainModel = require("../../../models/movie.model");
const User = require("../../../models/user.model");
const Comment = require("../../../models/comment.model");
const paginationHelper = require("../../../helper/pagination");
const sortHelper = require("../../../helper/sort");
const searchHelper = require("../../../helper/search");

module.exports.getAllMovies = async (req, res) => {
  try {
    const find = {};
    let initPagination = {
      currentPage: 1,
      limitItems: 12
    }

    const countMovies = await MainModel.countDocuments(find);
    const totalPages = Math.ceil(countMovies / initPagination.limitItems);
    const objectPagination = paginationHelper(initPagination, req.query, countMovies);
    const sort = sortHelper(req.query);

    let objectSearch = searchHelper(req.query);
    if(req.query.keyword) {
      find["movie.name"] = objectSearch.regex;
    }

    const movies = await MainModel.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
    res.json({
      movies: movies,
      totalMovies: countMovies,
      totalPages: totalPages,
      currentPage: objectPagination.currentPage
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
};

module.exports.getAllSeries = async (req, res) => {
  try {
    let find = { "movie.type": "series" };
    let initPagination = {
      currentPage: 1,
      limitItems: 12
    }

    const countMovies = await MainModel.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countMovies);
    const sort = sortHelper(req.query);

    const movies = await MainModel.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
};

module.exports.getAllFeatureFilms = async (req, res) => {
  try {
    let find = { "movie.type": "single" };
    let initPagination = {
      currentPage: 1,
      limitItems: 12
    }

    const countMovies = await MainModel.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countMovies);
    const sort = sortHelper(req.query);

    const movies = await MainModel.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
}

module.exports.getAllTVShows = async (req, res) => {
  try {
    let find = { "movie.type": "tvshows" };
    let initPagination = {
      currentPage: 1,
      limitItems: 12
    }

    const countMovies = await MainModel.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countMovies);
    const sort = sortHelper(req.query);

    const movies = await MainModel.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
}

module.exports.getAllAnimatedMovies = async (req, res) => {
  try {
    let find = { "movie.type": "hoathinh" };
    let initPagination = {
      currentPage: 1,
      limitItems: 12
    }

    const countMovies = await MainModel.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countMovies);
    const sort = sortHelper(req.query);

    const movies = await MainModel.find(find).sort(sort).skip(objectPagination.skip).limit(objectPagination.limitItems);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
}

module.exports.getMovieDetailsWithComments = async (req, res) => {
  try {
    const slug = req.params.slug;
    const movie = await MainModel.findOne({ "movie.slug": slug });
    const comments = await Comment.find({ movieId: movie.id }) || [];
    const response = {
      detail: movie,
      comments: comments
    }
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching from the database." });
  }
};

module.exports.createComment = async (req, res) => {
  try {
    const movieSlug = req.params.slug;
    const movie = await MainModel.findOne({ "movie.slug": movieSlug });
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    const text = req.body;
    const newComment = {
      userId: user.id,
      movieId: movie.id,
      text: text,
    };
    const comment = new Comment(newComment);
    await comment.save();
    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error" });
  }
}

module.exports.deleteComment = async (req, res) => {
  try {
    /* const commentId = req.params.id;
    await Comment.findByIdAndDelete({ id: commentId });
    res.redirect("back"); */
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
}

module.exports.getMoviesByGenre = async (req, res) => {
  try {
    const genre = req.params.genre;
    const movie = await MainModel.find({ "movie.category.slug": genre });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
};

module.exports.getMoviesByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const movie = await MainModel.find({ "movie.country.slug": country });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching from the database." });
  }
};