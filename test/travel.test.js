// test/travel.test.js - Version simplifiée
const travelService = require("../service/travelService");
const travelRepository = require("../repository/travelRepository");
const registrationRepository = require("../repository/registrationRepository");

jest.mock("../repository/travelRepository");
jest.mock("../repository/registrationRepository");

describe("TravelService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTravels", () => {
    it("should return travels for regular user", async () => {
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

      travelRepository.findAllAvailable.mockResolvedValue(mockTravels);
      travelRepository.findById.mockResolvedValue(mockTravels[0]);
      registrationRepository.countInscriptionByTravelId.mockResolvedValue(10);
      registrationRepository.findByTravelId.mockResolvedValue([]);

      const result = await travelService.getAllTravels({ role: "user" });

      expect(result).toHaveLength(1);
      expect(result[0].depart).toBe("Paris");
      expect(result[0].available_places).toBe(40);
    });

    it("should return all travels for admin", async () => {
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
          status: "booked",
        },
      ];

      travelRepository.findAll.mockResolvedValue(mockTravels);
      travelRepository.findById.mockResolvedValue(mockTravels[0]);
      registrationRepository.countInscriptionByTravelId.mockResolvedValue(5);
      registrationRepository.findByTravelId.mockResolvedValue([]);

      const result = await travelService.getAllTravels({ role: "admin" });

      expect(travelRepository.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
  });

  describe("getTravelById", () => {
    it("should return travel by id", async () => {
      const mockTravel = {
        _id: "123",
        depart: "Paris",
        places: 50,
      };

      travelRepository.findById.mockResolvedValue(mockTravel);
      registrationRepository.countInscriptionByTravelId.mockResolvedValue(10);

      const result = await travelService.getTravelById("123");

      expect(result.depart).toBe("Paris");
      expect(result.available_places).toBe(40);
    });
  });

  describe("createTravel", () => {
    it("should create new travel", async () => {
      const travelData = {
        start_date: "2023-10-01",
        end_date: "2023-10-10",
        depart: "Paris",
        destination: "Londres",
        places: 50,
        price: 200,
        status: "available",
      };

      const createdTravel = { _id: "123", ...travelData };
      travelRepository.create.mockResolvedValue(createdTravel);

      const result = await travelService.createTravel(travelData);

      expect(result.success).toBe(true);
      expect(result.newTravel._id).toBe("123");
    });
  });

  describe("updateTravel", () => {
    it("should update travel", async () => {
      const updateData = { depart: "Lyon" };

      travelRepository.findById.mockResolvedValue({ _id: "123" });
      travelRepository.update.mockResolvedValue(true);

      const result = await travelService.updateTravel("123", updateData);

      expect(result.message).toBe("travel updated successfully");
    });

    it("should throw error if travel not found", async () => {
      travelRepository.findById.mockResolvedValue(null);

      await expect(travelService.updateTravel("unknown", {})).rejects.toThrow(
        "travel not found"
      );
    });
  });

  describe("deleteTravel", () => {
    it("should delete travel", async () => {
      travelRepository.delete.mockResolvedValue(true);

      const result = await travelService.deleteTravel("123");

      expect(result).toBe(true);
    });

    it("should throw error if travel not found", async () => {
      travelRepository.delete.mockResolvedValue(null);

      await expect(travelService.deleteTravel("unknown")).rejects.toThrow(
        "Travel not found"
      );
    });
  });
});
