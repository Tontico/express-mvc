const travelRepository = require("../repository/travelRepository");
const homeService = require("../service/homeService");
const registrationRepository = require("../repository/registrationRepository");
const travelService = require("../service/travelService");
jest.mock("../repository/travelRepository");
jest.mock("../repository/registrationRepository");
jest.mock("../service/travelService");

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

      const mockFormattedTravels = [
        {
          id: "123",
          depart: "Paris",
          destination: "Londres",
          start_date: "01/10/2023",
          end_date: "10/10/2023",
          places: 50,
          available_places: 40,
          price: "200 €",
          status: "Disponible",
          registrations: [],
        },
      ];

      travelRepository.sortSixTravels.mockResolvedValue(mockTravels);
      travelService.getFormattedTravel.mockResolvedValue(mockFormattedTravels);

      const result = await homeService.index();

      expect(result).toHaveLength(1);
      expect(result[0].depart).toBe("Paris");
      expect(result[0].available_places).toBe(40);

      expect(travelRepository.sortSixTravels).toHaveBeenCalled();
      expect(travelService.getFormattedTravel).toHaveBeenCalledWith(
        mockTravels
      );
    });

    it("should throw an error if no featured travels found", async () => {
      travelRepository.sortSixTravels.mockResolvedValue([]);

      await expect(homeService.index()).rejects.toThrow(
        "No featured travels found"
      );
    });
  });
});
