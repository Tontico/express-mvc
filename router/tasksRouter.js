const express = require("express");
const router = express.Router();
const controller = require("../controller/tasksController");

router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/edit/:id", controller.edit);

router.get("/toggle-done/:id", controller.toggleDone);
router.post("/store", controller.store);
router.post("/update/:id", controller.update);
router.delete("/delete/:id", controller.delete);

module.exports = router;
