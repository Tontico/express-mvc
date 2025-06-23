const paymentRepository = require("../repository/paymentRepository");
const paymentService = require("../service/paymentService");
const registrationRepository = require("../repository/registrationRepository");

jest.mock("../repository/paymentRepository");
jest.mock("../repository/registrationRepository");

describe("PaymentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPaymentData", () => {
    it("should return payment data for a valid registration ID", async () => {
      const id_registration = "reg789";
      const id_user = "user123";

      const mockRegistration = {
        _id: id_registration,
        id_user: id_user,
        id_travel: "travel456",
        status: "pending",
      };

      registrationRepository.findById.mockResolvedValue(mockRegistration);

      const result = await paymentService.getPaymentData(
        id_registration,
        id_user
      );

      expect(result).toEqual({
        id_registration: mockRegistration._id,
        id_user: mockRegistration.id_user,
        travel: mockRegistration.id_travel,
        user: mockRegistration.id_user,
        price: mockRegistration.id_travel.price,
      });

      expect(registrationRepository.findById).toHaveBeenCalledWith(
        id_registration
      );
    });
    it("should throw an error if registration data not found", async () => {
      const id_registration = "invalidRegId";
      const id_user = "user123";
      registrationRepository.findById.mockResolvedValue(null);

      await expect(
        paymentService.getPaymentData(id_registration, id_user)
      ).rejects.toThrow("registration data not found");
      expect(registrationRepository.findById).toHaveBeenCalledWith(
        id_registration
      );
    });
  });
  describe("createPayment", () => {
    it("should create a payment and update registration status", async () => {
      const id_registration = "reg789";
      const paymentData = {
        amount: 100,
        paymentMethod: "credit_card",
      };

      const mockRegistration = {
        _id: id_registration,
        id_user: "user123",
        id_travel: "travel456",
        status: "pending",
      };

      registrationRepository.findById.mockResolvedValue(mockRegistration);
      const createdPayment = {
        _id: "payment123",
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        id_registration: mockRegistration._id,
        id_user: mockRegistration.id_user,
        id_travel: mockRegistration.id_travel,
        status: "completed",
      };
      paymentRepository.create.mockResolvedValue(createdPayment);

      const result = await paymentService.createPayment(
        id_registration,
        paymentData
      );

      expect(result).toEqual(createdPayment);
      expect(paymentRepository.create).toHaveBeenCalledWith({
        id_registration: mockRegistration._id,
        id_user: mockRegistration.id_user,
        id_travel: mockRegistration.id_travel,
        amount: paymentData.amount,
        payment_method: paymentData.paymentMethod,
        status: "completed",
      });
      expect(registrationRepository.update).toHaveBeenCalledWith(
        mockRegistration._id,
        {
          ...mockRegistration,
          status: "confirmed",
          payment: createdPayment._id,
        }
      );
    });

    it("should throw an error if registration not found", async () => {
      const id_registration = "invalidRegId";
      const paymentData = { amount: 100, paymentMethod: "credit_card" };

      registrationRepository.findById.mockResolvedValue(null);

      await expect(
        paymentService.createPayment(id_registration, paymentData)
      ).rejects.toThrow("Registration not found");
    });
  });
});
