const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = 3001;
const database = require("../config/connect");
const router = require("./api/v1/routes/index.route");

app.use(morgan("combined"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

database.connect();
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
