const HomeService = require("../service/homeService");
class HomeController {
  constructor() {
    this.homeService = HomeService;
  }
  index = async (req, res) => {
    try {
      const featuredTravels = await this.homeService.index();
      const logoutMsg = req.query.message || null;
      const successInscription = req.query.success || null;
      res.render("home/index", {
        title: "Accueil - Agence de Voyage",
        message: logoutMsg ? "Déconnecté avec succès" : null,
        success: successInscription,
        travels: featuredTravels,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .render("home/index", { title: "Erreur", travels: [], error });
    }
  };
}

module.exports = new HomeController();
