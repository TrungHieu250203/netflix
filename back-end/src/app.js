const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
require("dotenv").config();
const app = express();
const port = 3000;
const server = http.createServer(app);
const database = require("../config/connect");
const router = require("./api/v1/routes/index.route");
const initSocket = require("./middlewares/socket");
const io = initSocket(server);

app.set("socketio", io);
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

database.connect();
router(app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
