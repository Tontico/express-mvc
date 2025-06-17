const travelService = require("../service/travelService");

class TravelController {
  constructor() {
    this.travelService = travelService;
  }
  index = async (req, res) => {
    try {
      const formattedTravels = await this.travelService.getAllTravels();
      const path = req.originalUrl;
      let renderPath = "travel/index";
      if (path === "/admin/travel") {
        renderPath = "admin/travel/index";
      }

      return res.render(renderPath, { travels: formattedTravels });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.render("travel/index", {
        error: "Error fetching tasks: " + error.message,
        travels: [],
      });
    }
  };

  store = async (req, res) => {
    try {
      await this.travelService.createTravel(req.body);
      return res.redirect("/admin/travel");
    } catch (error) {
      console.error("Error creating task:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  create = (req, res) => {
    try {
      res.render("admin/travel/create", {
        title: "Creer un voyage",
        error: null,
      });
    } catch (error) {
      res.render("admin/travel/create", {
        title: "Creer un voyage",
        error:
          "Une erreur est survenue lors de la création du voyage: " +
          error.message,
      });
    }
  };

  update = async (req, res) => {
    try {
      await this.travelService.updateTravel(req.params.id, req.body);
      return res.redirect("/admin/travel");
    } catch (error) {
      console.error("Error updating travel:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  edit = async (req, res) => {
    try {
      const travel = await this.travelService.editTravel(req.params.id);
      res.render("admin/travel/edit", {
        title: "Editer un voyage",
        error: null,
        travel,
      });
    } catch (error) {
      res.render("travel/edit", {
        title: "Editer un voyage",
        error:
          "Une erreur est survenue lors de la modification du voyage: " +
          error.message,
        travel: null,
      });
    }
  };

  // delete = async (req, res) => {
  //   try {
  //     await this.travelService.deleteTask(req.params.id);
  //     res.redirect("/tasks");
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //     return res.status(500).send("Internal Server Error");
  //   }
  // };

  // toggleDone = async (req, res) => {
  //   try {
  //     await this.travelService.toggleDone(req.params.id);
  //     res.redirect("/tasks");
  //   } catch (error) {
  //     console.error("Error toggling task done status:", error);
  //     return res.status(500).send("Internal Server Error");
  //   }
  // };
}

module.exports = new TravelController();
