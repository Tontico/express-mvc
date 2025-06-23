const documentRepository = require("../repository/documentRepository");
const documentService = require("../service/documentService");
const travelRepository = require("../repository/travelRepository");
const registrationRepository = require("../repository/registrationRepository");

jest.mock("../repository/documentRepository");
jest.mock("../repository/travelRepository");
jest.mock("../repository/registrationRepository");

describe("DocumentService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getDocumentsByTravelId", () => {
    it("should return documents for a valid travel ID", async () => {
      const id_travel = "travel123";
      const mockDocuments = ["passport", "visa"];
      travelRepository.findById.mockResolvedValue(mockDocuments);

      const result = await documentService.getDocumentsByTravelId(id_travel);

      expect(result).toEqual(mockDocuments);
      expect(travelRepository.findById).toHaveBeenCalledWith(id_travel);
    });
    it("should throw an error if travel ID is invalid", async () => {
      const invalidId = "invalidTravelId";
      travelRepository.findById.mockResolvedValue(null);
      await expect(
        documentService.getDocumentsByTravelId(invalidId)
      ).rejects.toThrow("No documents found for the provided travel ID");
      expect(travelRepository.findById).toHaveBeenCalledWith(invalidId);
    });
  });
  describe("getDocumentsByRegistrationId", () => {
    it("should return documents for a valid registration ID", async () => {
      const id_registration = "reg123";
      const mockDocuments = ["passport", "visa"];
      registrationRepository.findByRegistrationId.mockResolvedValue(
        mockDocuments
      );

      const result = await documentService.getDocumentsByRegistrationId(
        id_registration
      );

      expect(result).toEqual(mockDocuments);
      expect(registrationRepository.findByRegistrationId).toHaveBeenCalledWith(
        id_registration
      );
    });
    it("should throw an error if registration ID is invalid", async () => {
      const invalidId = "invalidRegId";
      registrationRepository.findByRegistrationId.mockResolvedValue(null);
      await expect(
        documentService.getDocumentsByRegistrationId(invalidId)
      ).rejects.toThrow("No documents found for the provided registration ID");
      expect(registrationRepository.findByRegistrationId).toHaveBeenCalledWith(
        invalidId
      );
    });
  });
});
