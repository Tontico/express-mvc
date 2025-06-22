const payment = require("../model/payments");

class PaymentRepository {
  constructor() {
    this.payment = payment;
  }

  async create(paymentData) {
    return await this.payment.create(paymentData);
  }
  async findAllPaymentsByTravelId(id_travel) {
    return await this.payment
      .find({
        id_travel: id_travel,
      })
      .populate("id_user", "firstname lastname email");
  }
}
module.exports = new PaymentRepository();
