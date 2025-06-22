const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");

router.use(isAuthenticated);
router.get("/me", userController.getUser);
router.patch("/update/me", userController.updateUser);
router.get("/edit/me", userController.showUserForm);

module.exports = router;
