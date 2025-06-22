const express = require("express");
const registrationController = require("../controller/registrationController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

router.use(isAuthenticated);

router.get("/me", registrationController.showRegistrationByUserId);
router.delete("/delete/:id", registrationController.cancelRegistration);

router.post("/:id_travel", registrationController.postInscriptionMember);
router.get("/:id_travel", registrationController.showFirstStepRegistration);

module.exports = router;
