const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const MainModel = require("../../../models/movie.model");
const User = require("../../../models/user.model");
const Comment = require("../../../models/comment.model");
const createToken = require("../../../middlewares/jwt");

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Email not found." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password invalid." });
    }
    if(user.role !== "admin") {
      return res.status(500).json({ message: "Invalid" });
    }
    const token = createToken(user._id);
    res.cookie("adminToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 12200000),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ accessToken: token });
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.adminLogout = async (req, res) => {
  try {
    const authHeader = await req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;
    const userId = req.user.userId;
    if (token) {
      const newBlacklist = await new Blacklisting({
        userId: userId,
        token: token,
        expiresAt: new Date(Date.now() + 7200000),
      });
      await newBlacklist.save();
    }
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logout!" });
  }
};

module.exports.getDashboard = async (req, res) => {
  try {
    const movies = await MainModel.find({});
    const totalMovies = await MainModel.countDocuments({});
    let totalViews = 0;
    movies.forEach((m) => {
      totalViews += parseInt(m.movie.view);
    });
    const comments = await Comment.countDocuments({});
    const users = await User.countDocuments({});
    res.json({
      totalMovies: totalMovies,
      totalComments: comments,
      totalViews: totalViews,
      totalUsers: users,
    });
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.addMovie = async (req, res) => {
  try {
    const {
      created,
      name,
      slug,
      origin_name,
      content,
      type,
      status,
      poster_url,
      thumb_url,
      trailer_url,
      time,
      episode_current,
      episode_total,
      quality,
      lang,
      year,
      actor,
      director,
      category,
      country,
      episodes
    } = req.body;
    const convertActor = String(actor).split(",");
    const convertEpisodesObject = String(episodes).split(",").map(episode => {
      const arr = episode.split("|");
      return {
        name: arr[0],
        slug: arr[1],
        filename: arr[2],
        link_embed: arr[3],
        link_m3u8: arr[4],
      };
    });
    const convertDirector = director.split(" ");
    const convertEpisodes = [
      {
        "server_name": "#Hà Nội",
        "server_data": convertEpisodesObject
      }
    ];
    const convertYear = Number(year);
    const id = crypto.randomBytes(16).toString("hex");
    const newMovie = await new MainModel({
      status: true,
      msg: "",
      movie: {
        created: created,
        modified: created,
        _id: id,
        slug: slug,
        name: name,
        origin_name: origin_name,
        content: content,
        type: type,
        status: status,
        poster_url: poster_url,
        thumb_url: thumb_url,
        is_copyright: false,
        sub_docquyen: false,
        chieurap: false,
        trailer_url: trailer_url,
        time: time,
        episode_current: episode_current,
        episode_total: episode_total,
        quality: quality,
        lang: lang,
        notify: "",
        show_time: "",
        year: convertYear,
        view: 0,
        actor: convertActor,
        director: convertDirector,
        category: category,
        country: country,
      },
      episodes: convertEpisodes
    });
    await newMovie.save();
    res.json({ message: "Success !"});
  } catch (err) {
    console.error(err);
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    if (!movieId) {
      return res.status(400).send("Movie ID is required.");
    }
    await MainModel.findOneAndDelete({ "movie._id": movieId });
    res.json({ message: "Success !" });
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.editMoviePage = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await MainModel.findOne({ "movie._id": movieId });
    res.json(movie);
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.handleEditMovie = async (req, res) => {
  try {
    res.json({ message: "Success !" });
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.lockUser = async (req, res) => {
  try {
    const { userIdList } = req.body;
    await User.updateMany({ _id: { $in: userIdList } }, { isLocked: true } );
    res.json("Success");
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};

module.exports.unlockUser = async (req, res) => {
  try {
    const { userIdList } = req.body;
    await User.updateMany({ _id: { $in: userIdList } }, { isLocked: false } );
    res.json("Success");
  } catch (err) {
    res.status(500).send("Message: " + err.message);
  }
};