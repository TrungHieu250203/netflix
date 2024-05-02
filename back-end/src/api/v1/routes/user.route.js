const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

router.get("/profile", controller.getUserProfile);

router.post("/auth/register", controller.registerUser);

router.post("/auth/login", controller.loginUser);

module.exports = router;
