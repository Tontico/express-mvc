const travelRepository = require("../repository/travelRepository");
const registrationService = require("../service/registrationService");

class RegistrationController {
  constructor() {
    this.registrationService = registrationService;
    this.travelRepository = travelRepository;
  }

  showFirstStepRegistration = async (req, res) => {
    try {
      const travel = await this.registrationService.showFirstStepRegistration(
        req.params.id_travel,
        req.user._id
      );

      return res.render("registration/firstStep", {
        title: "Inscription",
        travel: travel.travel,
        existingRegistration: travel.existingRegistration,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  postInscriptionMember = async (req, res) => {
    try {
      const { id_travel } = req.params;
      const id_user = req.user._id;
      console.log("User ID:", id_user);

      if (!id_travel || !id_user) {
        return res.status(400).send("Trip ID and User ID are required");
      }

      const registration = await this.registrationService.postInscriptionMember(
        id_travel,
        id_user
      );

      return res.redirect(`/document/${registration._id}`);
    } catch (error) {
      return res.render("registration/firstStep", {
        title: "Inscription",
        travel: await this.travelRepository.findById(req.params.id_travel),
        error: "Erreur lors de l'inscription : " + error.message,
      });
    }
  };

  showRegistrationByUserId = async (req, res) => {
    try {
      const id_user = req.user._id;
      const registrations =
        await this.registrationService.getRegistrationsByUserId(id_user);

      if (!registrations || registrations.length === 0) {
        return res.status(404).send("No registrations found for this user");
      }

      return res.render("registration/registrationUser", {
        title: "Mes inscriptions",
        registrations: registrations,
      });
    } catch (error) {
      console.error("Error fetching user registrations:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  cancelRegistration = async (req, res) => {
    try {
      const registration = await this.registrationService.cancelRegistration(
        req.params.id
      );

      if (!registration) {
        return res.status(404).send("Registration not found");
      }

      return res.redirect("/registration/me?success=true");
    } catch (error) {
      console.error("Error canceling registration:", error);
      return res.status(500).send("Internal Server Error");
    }
  };

  registrationByTravelId = async (req, res) => {
    try {
      const registrations =
        await this.registrationService.getRegistrationsByTravelId(
          req.params.id_travel
        );

      if (!registrations || registrations.length === 0) {
        return res.status(404).send("No registrations found for this travel");
      }

      return res.render("admin/registration/index", {
        title: "Inscriptions par voyage",
        travel: await this.travelRepository.findById(req.params.id_travel),
        registrations: registrations,
      });
    } catch (error) {
      console.error("Error fetching registrations by travel ID:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
}
module.exports = new RegistrationController();
