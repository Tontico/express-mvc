const authService = require("../service/authService");

class authController {
  constructor(authService) {
    this.authService = authService;
  }

  showLoginForm = async (req, res) => {
    res.render("auth/login", {
      title: "Connexion",
      errrors: null,
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
      const newUser = await this.authService.register(req.body);
      this.authService.generateSecureCookie(res, newUser.token);
      res.redirect("/");
    } catch (error) {
      res.render("auth/register", {
        title: "Inscription",
        errors:
          "Une erreur est survenue lors de l'inscription, veuillez réessayer : " +
          error.message,
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let error = null;
      const existingEmail = await this.authService.checkEmailExists(email);
      if (existingEmail) {
        error = "Mot de passe ou identifiant incorrect";
      }
      const user = await this.authService.login(email, password);

      this.authService.generateSecureCookie(res, user.token);
      res.redirect("/");
    } catch (error) {
      console.log("Erreur lors de la connexion :", error);
      res.render("auth/login", {
        title: "Connexion",
        errors: "Identifiant ou mot de passe incorrect",
      });
    }
  };

  logout = async (req, res) => {
    await this.authService.logout(req, res);
    res.redirect("/?message=true");
  };
}

module.exports = new authController(authService);
