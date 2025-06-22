const userService = require("../service/userService");

class UserController {
  constructor() {
    this.userService = userService;
  }

  getUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await this.userService.getUserById(userId);
      res.render("profile/index", { user });
    } catch (error) {
      res.render("user/profile", {
        message: "Problème lors de la récupération de l'utilisateur",
        user: req.user,
        error: error.message,
      });
    }
  };

  updateUser = async (req, res) => {
    try {
      const newUser = await this.userService.updateUser(req.user.id, req.body);
      return res.render("profile/index", {
        user: newUser,
        message: "Modification réussie",
      });
    } catch (error) {
      return res.render("profile/edit", {
        user: req.user,
        message: "Problème lors de la modification",
        error: error.message,
      });
    }
  };

  showUserForm = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.render("profile/edit", { user });
    } catch (error) {
      res.render("profile/edit", {
        message: "Problème lors de la récupération de l'utilisateur",
        user: req.user,
        error: error.message,
      });
    }
  };
}
module.exports = new UserController();
