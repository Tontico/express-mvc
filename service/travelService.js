const travelRepository = require("../repository/travelRepository");
const registrationRepository = require("../repository/registrationRepository");
const moment = require("moment");

class TravelService {
  constructor() {
    this.travelRepository = travelRepository;
    this.registrationRepository = registrationRepository;
    this.moment = moment;
  }

  async getAllTravels(user) {
    try {
      let allTravels;
      if (user && user.role === "admin") {
        allTravels = await this.travelRepository.findAll();
      } else {
        allTravels = await this.travelRepository.findAllAvailable();
      }
      if (!allTravels || allTravels.length === 0) {
        return new Error("No tasks found");
      }
      const formattedTravels = await this.getFormattedTravel(allTravels);

      return formattedTravels;
    } catch (error) {
      throw new Error("Error fetching tasks: " + error.message);
    }
  }

  async getTravelById(id) {
    try {
      const travel = await this.travelRepository.findById(id);
      travel.available_places = await this.getAvailablePlaces(id);
      if (!travel) {
        return new Error("No travel found");
      }
      return travel;
    } catch (error) {
      throw new Error("Error fetching task: " + error.message);
    }
  }

  async createTravel(travelData) {
    try {
      const {
        start_date,
        end_date,
        depart,
        destination,
        places,
        price,
        status,
      } = travelData;
      const newTravel = await this.travelRepository.create({
        start_date: moment(start_date).toDate(),
        end_date: moment(end_date).toDate(),
        depart,
        destination,
        places,
        price,
        status,
      });
      if (!newTravel) {
        return new Error("No tasks found");
      }
      return { success: true, newTravel };
    } catch (error) {
      throw new Error("Error creating travel: " + error.message);
    }
  }

  async updateTravel(id, travelData) {
    try {
      const travel = await this.travelRepository.findById(id);

      if (!travel) {
        throw new Error("travel not found");
      }
      const updated = await this.travelRepository.update(id, travelData);

      if (!updated) {
        return new Error("No travel found");
      }

      return { message: "travel updated successfully" };
    } catch (error) {
      throw new Error("Error updating task: " + error.message);
    }
  }

  async editTravel(id) {
    try {
      const travel = await this.travelRepository.findById(id);
      if (!travel) {
        throw new Error("travel not found");
      }

      if (travel.start_date) {
        travel.start_date_formated = moment(travel.start_date).format(
          "YYYY-MM-DD"
        );
      }
      if (travel.end_date) {
        travel.end_date_formated = moment(travel.end_date).format("YYYY-MM-DD");
      }

      return travel;
    } catch (error) {
      throw new Error("Error editing travel: " + error.message);
    }
  }

  async deleteTravel(id) {
    try {
      const travel = await this.travelRepository.delete(id);
      if (!travel) {
        throw new Error("Travel not found");
      }
      return true;
    } catch (error) {
      throw new Error("Error deleting travel: " + error.message);
    }
  }

  async getAvailablePlaces(id) {
    try {
      const travel = await this.travelRepository.findById(id);

      if (!travel) {
        throw new Error("Travel not found");
      }
      const maxPlaces = travel.places;
      const countInscriptions =
        await this.registrationRepository.countInscriptionByTravelId(id);

      const availablePlaces = maxPlaces - countInscriptions;

      return availablePlaces >= 0 ? availablePlaces : 0;
    } catch (error) {
      throw new Error("Error fetching available places: " + error.message);
    }
  }

  async getFormattedTravel(travels) {
    try {
      return await Promise.all(
        travels.map(async (travel) => {
          const availablePlaces = await this.getAvailablePlaces(travel._id);
          const existingRegistrations =
            await this.registrationRepository.findByTravelId(travel._id);
          return {
            id: travel._id.toString(),
            depart: travel.depart,
            destination: travel.destination,
            start_date: new Date(travel.start_date).toLocaleDateString("fr-FR"),
            end_date: new Date(travel.end_date).toLocaleDateString("fr-FR"),
            places: travel.places,
            available_places: availablePlaces,
            price: `${travel.price.toLocaleString("fr-FR")} €`,
            status:
              travel.status === "available"
                ? "Disponible"
                : travel.status === "booked"
                ? "Complet"
                : travel.status === "reserved"
                ? "Réservé"
                : "Annulé",
            registrations: existingRegistrations,
          };
        })
      );
    } catch (error) {
      throw new Error("Error formatting travels: " + error.message);
    }
  }
}

module.exports = new TravelService();
