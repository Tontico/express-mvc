const paymentService = require("../service/paymentService");

class PaymentController {
  constructor() {
    this.paymentService = paymentService;
  }

  showPaymentForm = async (req, res) => {
    try {
      const { id_registration } = req.params;
      const id_user = req.user._id;

      const data = await this.paymentService.getPaymentData(
        id_registration,
        id_user
      );

      res.render("payment/paymentForm", {
        title: "Payment Form",
        data: data,
      });
    } catch (error) {
      console.error("Error rendering payment form:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  createPayment = async (req, res) => {
    try {
      const { id_registration } = req.params;

      const payments = await this.paymentService.createPayment(
        id_registration,
        req.body
      );
      if (!payments) {
        return res.status(400).send("Payment creation failed");
      }

      res.redirect(`/?success=true`);
    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  showPaymentUser = async (req, res) => {
    try {
      const { id_registration } = req.params;
      const id_user = req.user._id;

      const data = await this.paymentService.getPaymentData(
        id_registration,
        id_user
      );

      if (!data) {
        return res.status(404).send("Payment not found");
      }

      res.render("payment/show", {
        title: "Payment Details",
        data: data,
      });
    } catch (error) {
      console.error("Error retrieving payment details:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  getAllPaymentsForTravel = async (req, res) => {
    try {
      const { id_travel } = req.params;
      if (!id_travel) {
        return res.status(400).json({ error: "ID de voyage manquant" });
      }

      const payments = await this.paymentService.getAllPaymentsByTravelId(
        id_travel
      );
      return res.render("admin/payment/travelsPayments", {
        title: "Payments du voyage",
        payments: payments.payments,
        travel: payments.travel,
        id_travel: id_travel,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      return res.status(500).json({
        error:
          "Erreur lors de la récupération des documents : " + error.message,
      });
    }
  };
}
module.exports = new PaymentController();
