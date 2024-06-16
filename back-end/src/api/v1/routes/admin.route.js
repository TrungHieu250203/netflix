const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin.controller");

router.post("/login", controller.adminLogin);
router.get("/dashboard", controller.getDashboard);
router.post("/create-movie", controller.addMovie);

module.exports = router;
