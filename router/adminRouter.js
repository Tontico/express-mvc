const express = require("express");
const router = express.Router();
const controller = require("../controller/travelController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.use(isAuthenticated);
router.use(isAdmin);

router.get("/travel", controller.index);

router.get("/travel/create", controller.create);
router.post("/travel/store", controller.store);

router.get("/travel/edit/:id", controller.edit);
router.put("/travel/update/:id", controller.update);

module.exports = router;
