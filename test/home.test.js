const travelRepository = require("../repository/travelRepository");
const homeService = require("../service/homeService");
const registrationRepository = require("../repository/registrationRepository");

jest.mock("../repository/travelRepository");
jest.mock("../repository/registrationRepository");

describe("HomeService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("index", () => {
    it("should return featured travels", async () => {
      const mockTravels = [
        {
          _id: "123",
          depart: "Paris",
          destination: "Londres",
          start_date: new Date("2023-10-01"),
          end_date: new Date("2023-10-10"),
          places: 50,
          available_places: 40,
          price: 200,
          status: "available",
        },
      ];

      travelRepository.sortSixTravels.mockResolvedValue(mockTravels);
      travelRepository.findById.mockResolvedValue(mockTravels[0]);

      registrationRepository.countInscriptionByTravelId.mockResolvedValue(10);
      registrationRepository.findByTravelId.mockResolvedValue([]);

      const result = await homeService.index();

      expect(result).toHaveLength(1);
      expect(result[0].depart).toBe("Paris");
      expect(result[0].available_places).toBe(40);
      expect(travelRepository.sortSixTravels).toHaveBeenCalled();
      expect(travelRepository.findById).toHaveBeenCalledWith("123");
      expect(
        registrationRepository.countInscriptionByTravelId
      ).toHaveBeenCalledWith("123");
      expect(registrationRepository.findByTravelId).toHaveBeenCalledWith("123");
    });

    it("should throw an error if no featured travels found", async () => {
      travelRepository.sortSixTravels.mockResolvedValue([]);

      await expect(homeService.index()).rejects.toThrow(
        "No featured travels found"
      );
    });
  });
});
