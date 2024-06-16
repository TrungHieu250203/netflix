const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const authenticateToken = require("../../../middlewares/authenticate");
const upload = require("../../../middlewares/multer");

router.get("/profile", authenticateToken, controller.getUserProfile);
router.patch("/profile/edit", authenticateToken, controller.editUserProfile);
router.post("/auth/register", upload.single("avatar"), controller.userRegister);
router.post("/auth/login", controller.userLogin);
router.get("/auth/logout", authenticateToken, controller.userLogout);
router.post("/contact/send", controller.handleFeedback);
router.post("/forgot-password/send-mail", controller.handleForgotPassword);
router.post("/forgot-password/confirm-code", controller.userConfirm);
router.patch("/forgot-password/new-password", controller.resetPassword);

module.exports = router;
