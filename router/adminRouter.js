const express = require("express");

const travelController = require("../controller/travelController");
const registrationController = require("../controller/registrationController");
const documentController = require("../controller/documentController");
const paymentController = require("../controller/paymentController");

const { isAuthenticated, isAdmin } = require("../middleware/auth");

const {
  createTravelValidator,
  updateTravelValidator,
} = require("../validator/travelValidator");

const validate = require("../validator/validate");

const router = express.Router();

router.use(isAuthenticated);
router.use(isAdmin);

router.get("/travel", travelController.index);
router.get("/travel/create", travelController.create);
router.get("/travel/edit/:id", travelController.edit);

router.post(
  "/travel/store",
  createTravelValidator,
  validate("admin/travel/create"),
  travelController.store
);
router.patch(
  "/travel/update/:id",
  updateTravelValidator,
  validate("admin/travel/edit"),
  travelController.update
);

router.delete("/travel/delete/:id", travelController.delete);

router.post("/document/:id_travel", documentController.addRequiredDocuments);
router.get("/document/:id_travel", documentController.addRequiredDocumentsForm);
router.get(
  "/document/travel/:id_travel",
  documentController.getAllDocumentsForTravel
);

router.get(
  "/registration/travel/:id_travel",
  registrationController.registrationByTravelId
);

router.get(
  "/payment/travel/:id_travel",
  paymentController.getAllPaymentsForTravel
);

module.exports = router;
