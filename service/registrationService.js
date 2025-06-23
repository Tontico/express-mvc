const registrationRepository = require("../repository/registrationRepository");
const travelRepository = require("../repository/travelRepository");
const travelService = require("./travelService");

class RegistrationService {
  constructor() {
    this.travelService = travelService;
    this.registrationRepository = registrationRepository;
    this.travelRepository = travelRepository;
  }

  async showFirstStepRegistration(id_travel, id_user) {
    try {
      if (!id_travel) {
        throw new Error("Trip ID is required");
      }
      const travel = await this.travelRepository.findById(id_travel);
      if (!travel) {
        throw new Error("No travel found with the provided ID");
      }
      if (travel.status !== "available") {
        throw new Error("Travel is not available for registration");
      }
      const availablePlaces = await this.travelService.getAvailablePlaces(
        travel._id
      );
      travel.available_places = availablePlaces;
      await this.travelRepository.update(travel, travel._id, {
        new: true,
      });
      const existingRegistration =
        await this.registrationRepository.findByUserIdAndTravelId(
          id_user,
          id_travel
        );

      return { travel, existingRegistration };
    } catch (error) {
      throw new Error(
        "Error fetching travel for registration: " + error.message
      );
    }
  }

  async postInscriptionMember(id_travel, id_user) {
    try {
      const existingRegistration =
        await this.registrationRepository.findByUserIdAndTravelId(
          id_user,
          id_travel
        );
      if (existingRegistration) {
        throw new Error("User is already registered for this travel");
      }
      const registration = await this.registrationRepository.create({
        status: "pending",
        id_travel,
        id_user,
      });
      if (!registration) {
        throw new Error("No inscription created");
      }
      console.log("Registration created successfully:", registration);

      const travel = await this.travelRepository.findById(
        registration.id_travel
      );

      if (!travel) {
        throw new Error("No travel found for the inscription");
      }

      const availablePlaces = await this.travelService.getAvailablePlaces(
        travel._id
      );

      travel.available_places = availablePlaces;
      await this.travelRepository.update(travel._id, travel);

      return registration;
    } catch (error) {
      throw new Error("Error creating inscription: " + error.message);
    }
  }

  async getRegistrationsByUserId(id_user) {
    try {
      const inscriptions = await this.registrationRepository.findByUserId(
        id_user
      );
      return inscriptions || [];
    } catch (error) {
      throw new Error("Error fetching inscriptions: " + error.message);
    }
  }

  async cancelRegistration(id) {
    try {
      const registration = await this.registrationRepository.findById(id);
      if (!registration) {
        throw new Error("No registration found with the provided ID");
      }
      const travel = await this.travelRepository.findById(
        registration.id_travel
      );
      if (!travel) {
        throw new Error("No travel found for the registration");
      }
      await this.registrationRepository.delete(id);

      return travel;
    } catch (error) {
      throw new Error("Error canceling registration: " + error.message);
    }
  }

  async getRegistrationsByTravelId(id_travel) {
    try {
      const registrations = await this.registrationRepository.findByTravelId(
        id_travel
      );
      if (!registrations || registrations.length === 0) {
        return new Error("No registrations found for this travel");
      }
      return registrations;
    } catch (error) {
      throw new Error(
        "Error fetching registrations by travel ID: " + error.message
      );
    }
  }
}
module.exports = new RegistrationService();
