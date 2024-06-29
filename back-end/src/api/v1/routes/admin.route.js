const express = require("express");
const router = express.Router();

const controller = require("../controllers/admin.controller");
const authenticateToken = require("../../../middlewares/authenticate");

router.post("/login", controller.adminLogin);
router.get("/auth/logout", authenticateToken, controller.adminLogout);
router.get("/dashboard", controller.getDashboard);
router.post("/create-movie", controller.addMovie);
router.delete("/delete/:movieId", controller.deleteMovie);
router.get("/edit/:movieId", controller.editMoviePage);
router.patch("/edit/:movieId/upload", controller.handleEditMovie);
router.get("/users", controller.getUsers);
router.patch("/users/lock", controller.lockUser);
router.patch("/users/unlock", controller.unlockUser);

module.exports = router;
