const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.get("/me", homeController.index);
router.patch("/update/me", userController.update);
router.get("/edit/me", userController.edit);

module.exports = router;
