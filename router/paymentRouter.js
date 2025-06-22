const express = require("express");
const paymentController = require("../controller/paymentController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.use(isAuthenticated);
router.get("/:id_registration", paymentController.showPaymentForm);
router.post("/:id_registration", paymentController.createPayment);
router.get("/me/:id_registration", paymentController.showPaymentUser);

module.exports = router;
