const Travel = require("../model/travels");

class HomeService {
  constructor() {
    this.travel = Travel;
  }

  async index() {
    try {
      const featuredTravels = await Travel.find({ status: "available" })
        .limit(6)
        .sort({ createdAt: -1 });

      if (!featuredTravels || featuredTravels.length === 0) {
        throw new Error("No featured travels found");
      }

      return featuredTravels;
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching featured travels: " + error.message);
    }
  }
}
module.exports = new HomeService();
