const authService = require("../service/authService");

class authController {
  constructor(authService) {
    this.authService = authService;
  }

  showLoginForm = (req, res) => {
    res.render("auth/login", {
      title: "Connexion",
      error: null,
    });
  };

  showRegisterForm = (req, res) => {
    res.render("auth/register", {
      title: "Inscription",
      error: null,
    });
  };

  register = async (req, res) => {
    try {
      await this.authService.register(req.body, res);
      res.redirect("/");
    } catch (error) {
      res.render("auth/register", {
        title: "Inscription",
        error:
          "Une erreur est survenue lors de l'inscription, veuillez réessayer.",
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      await this.authService.login(email, password, res);

      res.redirect("/");
    } catch (error) {
      res.render("auth/login", {
        title: "Connexion",
        error: "Identifiant ou mot de passe incrorrect: " + error.message,
      });
    }
  };

  // Déconnexion
  logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la déconnexion" });
      }
      res.redirect("/");
    });
  };
}

module.exports = new authController(authService);
