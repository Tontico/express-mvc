const express = require("express");
const documentController = require("../controller/documentController");
const { isAuthenticated } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const router = express.Router();
router.use(isAuthenticated);
router.get("/:id_registration", documentController.getDocumentsForRegistration);
router.post(
  "/:id_registration",
  upload.any(),
  documentController.uploadDocuments
);
router.get("/me/:id_registration", documentController.showDocumentsForUser);
module.exports = router;
