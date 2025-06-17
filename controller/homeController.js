const Travel = require("../model/travels");
const HomeService = require("../service/homeService");

class HomeController {
  constructor() {
    this.homeService = HomeService;
  }
  index = async (req, res) => {
    try {
      const featuredTravels = await this.homeService.index();
      res.render("home/index", {
        title: "Accueil - Agence de Voyage",
        travels: featuredTravels,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .render("home/index", { title: "Erreur", travels: [], error });
    }
  };

  about = async (req, res) => {
    res.render("home/about", { title: "À propos" });
  };
}

module.exports = new HomeController();
