const paymentRepository = require("../repository/paymentRepository");
const registrationRepository = require("../repository/registrationRepository");
const travelRepository = require("../repository/travelRepository");
class PaymentService {
  constructor() {
    this.paymentRepository = paymentRepository;
    this.registrationRepository = registrationRepository;
    this.travelRepository = travelRepository;
  }

  async getPaymentData(id_registration, id_user) {
    try {
      const registration = await this.registrationRepository.findById(
        id_registration
      );

      if (!registration) {
        throw new Error("registration data not found");
      }
      const paymentData = {
        id_registration: registration._id,
        id_user: id_user,
        travel: registration.id_travel,
        user: registration.id_user,
        price: registration.id_travel.price,
      };

      return paymentData;
    } catch (error) {
      console.error("Error fetching payment data:", error);
      throw error;
    }
  }

  async createPayment(id_registration, paymentData) {
    try {
      const registration = await this.registrationRepository.findById(
        id_registration
      );

      if (!registration) {
        throw new Error("Registration not found");
      }

      const payment = {
        id_registration: registration._id,
        id_user: registration.id_user,
        id_travel: registration.id_travel,
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        status: "completed",
      };

      const createdPayment = await this.paymentRepository.create(payment);

      registration.status = "confirmed";
      registration.payment = createdPayment._id;
      await this.registrationRepository.update(registration._id, registration);
      return createdPayment;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  }

  async getAllPaymentsByTravelId(id_travel) {
    try {
      if (!id_travel) {
        throw new Error("Travel ID is required");
      }
      const travel = await this.travelRepository.findById(id_travel);
      if (!travel) {
        throw new Error("Travel not found");
      }

      const payments = await this.paymentRepository.findAllPaymentsByTravelId(
        id_travel
      );

      return { payments, travel };
    } catch (error) {
      console.error("Error fetching all documents by travel ID:", error);
      throw error;
    }
  }
}
module.exports = new PaymentService();
