const express = require("express");
const authController = require("../controller/authController");
const { redirectIfAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/login", redirectIfAuthenticated, authController.showLoginForm);
router.get(
  "/register",
  redirectIfAuthenticated,
  authController.showRegisterForm
);

module.exports = router;
