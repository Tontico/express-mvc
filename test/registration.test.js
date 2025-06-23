const registrationRepository = require("../repository/registrationRepository");
const registrationService = require("../service/registrationService");
const travelRepository = require("../repository/travelRepository");
const travelService = require("../service/travelService");

jest.mock("../repository/registrationRepository");
jest.mock("../repository/travelRepository");
jest.mock("../service/travelService");

describe("RegistrationService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createRegistration", () => {
    it("should create a new registration", async () => {
      const registrationData = {
        id_user: "user123",
        id_travel: "event456",
        status: "pending",
      };

      const createdRegistration = {
        ...registrationData,
        _id: "reg789",
      };

      const mockTravel = {
        _id: "event456",
        depart: "Paris",
        destination: "Londres",
        places: 50,
        available_places: 40,
        status: "available",
      };

      registrationRepository.create.mockResolvedValue(createdRegistration);
      registrationRepository.findByUserIdAndTravelId.mockResolvedValue(null);

      travelRepository.findById.mockResolvedValue(mockTravel);
      travelRepository.update.mockResolvedValue(true);

      travelService.getAvailablePlaces.mockResolvedValue(40);

      const result = await registrationService.postInscriptionMember(
        registrationData.id_travel,
        registrationData.id_user
      );

      expect(result).toEqual(createdRegistration);
      expect(registrationRepository.create).toHaveBeenCalledWith({
        status: "pending",
        id_travel: registrationData.id_travel,
        id_user: registrationData.id_user,
      });
      expect(travelService.getAvailablePlaces).toHaveBeenCalledWith("event456");
    });

    describe("getRegistrationsByUserId", () => {
      it("should return registrations for a valid user ID", async () => {
        const mockRegistrations = [
          {
            _id: "reg1",
            id_user: "user123",
            id_travel: "event1",
            status: "confirmed",
          },
          {
            _id: "reg2",
            id_user: "user123",
            id_travel1: "event2",
            status: "pending",
          },
        ];

        registrationRepository.findByUserId.mockResolvedValue(
          mockRegistrations
        );

        const result = await registrationService.getRegistrationsByUserId(
          mockRegistrations[0].id_user
        );

        expect(result).toEqual(mockRegistrations);
        expect(registrationRepository.findByUserId).toHaveBeenCalledWith(
          mockRegistrations[0].id_user
        );
      });
      it("should return empty array if no registrations found", async () => {
        registrationRepository.findByUserId.mockResolvedValue([]);

        const result = await registrationService.getRegistrationsByUserId(
          "unknownUser"
        );

        expect(result).toEqual([]);
        expect(registrationRepository.findByUserId).toHaveBeenCalledWith(
          "unknownUser"
        );
      });
    });
  });
});
