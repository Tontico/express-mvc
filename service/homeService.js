const travelRepository = require("../repository/travelRepository");
const travelService = require("../service/travelService");

class HomeService {
  constructor() {
    this.travelRepository = travelRepository;
    this.travelService = travelService;
  }

  async index() {
    try {
      const featuredTravels = await this.travelRepository.sortSixTravels();

      if (!featuredTravels || featuredTravels.length === 0) {
        throw new Error("No featured travels found");
      }

      const availableTravels =
        this.travelService.getFormattedTravel(featuredTravels);

      return availableTravels;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching featured travels: " + error.message);
    }
  }
}
module.exports = new HomeService();
