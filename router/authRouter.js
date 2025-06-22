const express = require("express");
const authController = require("../controller/authController");
const { redirectIfAuthenticated } = require("../middleware/auth");
const {
  loginValidator,
  registerValidator,
} = require("../validator/authValidator");
const validate = require("../validator/validate");
const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate("auth/register"),
  authController.register
);
router.post(
  "/login",
  loginValidator,
  validate("auth/login"),
  authController.login
);

router.get("/logout", authController.logout);

router.get("/login", redirectIfAuthenticated, authController.showLoginForm);
router.get(
  "/register",
  redirectIfAuthenticated,
  authController.showRegisterForm
);

module.exports = router;
