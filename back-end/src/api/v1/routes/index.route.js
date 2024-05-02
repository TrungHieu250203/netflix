const movieRouter = require("./movie.route");
const userRouter = require("./user.route");

module.exports = async (app) => {
    app.use("/api/movies", movieRouter);
    app.use("/api/users", userRouter);
}