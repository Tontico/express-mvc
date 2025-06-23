const documentRepository = require("../repository/documentRepository");
const travelRepository = require("../repository/travelRepository");
const registrationRepository = require("../repository/registrationRepository");
class DocumentService {
  constructor() {
    this.documentRepository = documentRepository;
    this.travelRepository = travelRepository;
    this.registrationRepository = registrationRepository;
  }

  async getDocumentsByTravelId(id_travel) {
    try {
      if (!id_travel) {
        throw new Error("travel ID is required");
      }
      const documents = await this.travelRepository.findById(id_travel);

      if (!documents || documents.length === 0) {
        throw new Error("No documents found for the provided travel ID");
      }
      return documents;
    } catch (error) {
      console.error("Error fetching documents by travel ID:", error);
      throw error;
    }
  }
  async getDocumentsByRegistrationId(id_registration) {
    try {
      if (!id_registration) {
        throw new Error("Registration ID is required");
      }
      const documents = await this.registrationRepository.findByRegistrationId(
        id_registration
      );

      if (!documents || documents.length === 0) {
        throw new Error("No documents found for the provided registration ID");
      }
      return documents;
    } catch (error) {
      console.error("Error fetching documents by travel ID:", error);
      throw error;
    }
  }

  async addRequiredDocuments(id_travel, document) {
    try {
      const travel = await this.travelRepository.findById(id_travel);
      if (!travel) {
        throw new Error("Travel not found");
      }
      if (!travel.documents_required) {
        travel.documents_required = [];
      }

      if (
        travel.documents_required &&
        travel.documents_required.includes(document)
      ) {
        throw new Error("Document already exists");
      }

      const updatedTravel = await this.travelRepository.addRequiredDocument(
        id_travel,
        document
      );
      if (!updatedTravel) {
        throw new Error("Failed to update travel with document");
      }
      return updatedTravel;
    } catch (error) {
      console.error("Error adding required documents:", error);
      throw error;
    }
  }
  async saveDocuments(documents) {
    try {
      if (!documents || documents.length === 0) {
        throw new Error("No documents provided");
      }

      const savedDocuments = [];
      for (const doc of documents) {
        const savedDoc = await this.documentRepository.create({
          id_user: doc.id_user,
          id_registration: doc.id_registration,
          type: doc.type,
          url: doc.url,
        });
        savedDocuments.push(savedDoc);
      }
      const registration = await this.registrationRepository.findById(
        documents[0].id_registration
      );
      if (!registration) {
        throw new Error("Registration not found");
      }
      registration.documents = savedDocuments.map((doc) => doc._id);
      registration.status = "documents_uploaded";
      await this.registrationRepository.update(
        documents[0].id_registration,
        registration
      );
      return savedDocuments;
    } catch (error) {
      console.error("Error saving documents:", error);
      throw error;
    }
  }

  async getAllDocumentsByTravelId(id_travel) {
    try {
      if (!id_travel) {
        throw new Error("Travel ID is required");
      }
      const travel = await this.travelRepository.findById(id_travel);
      if (!travel) {
        throw new Error("Travel not found");
      }
      const registrations = await this.registrationRepository.findByTravelId(
        id_travel
      );

      const documents = await this.documentRepository.findAllDocumentsByRegId(
        registrations.map((reg) => reg._id)
      );
      return { documents, travel, registrations };
    } catch (error) {
      console.error("Error fetching all documents by travel ID:", error);
      throw error;
    }
  }
}
module.exports = new DocumentService();
