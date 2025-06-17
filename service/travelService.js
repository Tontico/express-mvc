const travelRepository = require("../repositories/travelRepository");
const moment = require("moment");

class TravelService {
  constructor() {
    this.travelRepository = travelRepository;
    this.moment = moment;
  }

  async getAllTravels() {
    try {
      const allTravels = await this.travelRepository.findAll();
      if (!allTravels || allTravels.length === 0) {
        return new Error("No tasks found");
      }
      const formattedTravels = allTravels.map((travel) => {
        return {
          id: travel.id,
          depart:
            travel.depart.toUpperCase()[0] +
            travel.depart.slice(1).toLowerCase(),
          places: travel.places,
          price: travel.price.toFixed(2).replace(".", ",") + " €",
          destination:
            travel.destination.toUpperCase()[0] +
            travel.destination.slice(1).toLowerCase(),
          start_date: travel.start_date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          end_date: travel.end_date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        };
      });
      return formattedTravels;
    } catch (error) {
      throw new Error("Error fetching tasks: " + error.message);
    }
  }

  async getTaskById(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        return new Error("No tasks found");
      }
      return task;
    } catch (error) {
      throw new Error("Error fetching task: " + error.message);
    }
  }

  async createTravel(travelData) {
    try {
      const { start_date, end_date, depart, destination, places, price } =
        travelData;
      const newTravel = await this.travelRepository.create({
        start_date: moment(start_date).toDate(),
        end_date: moment(end_date).toDate(),
        depart,
        destination,
        places,
        price,
        status: "available",
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
      const updated = await this.travelRepository.update(travelData, {
        _id: id,
      });

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

  async deleteTask(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }
      await this.tasksRepository.destroy({ where: { id } });
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting task: " + error.message);
    }
  }

  async toggleDone(id) {
    try {
      const task = await this.tasksRepository.findByPk(id);
      if (!task) {
        throw new Error("Task not found");
      }
      task.done = !task.done;
      await task.save();
      return { message: "Task status toggled successfully" };
    } catch (error) {
      throw new Error("Error toggling task status: " + error.message);
    }
  }
}

module.exports = new TravelService();
