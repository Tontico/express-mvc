const documentService = require("../service/documentService");

class DocumentController {
  constructor() {
    this.documentService = documentService;
  }

  addRequiredDocumentsForm = async (req, res) => {
    try {
      const { id_travel } = req.params;
      const travels = await this.documentService.getDocumentsByTravelId(
        id_travel
      );
      const documents = {
        passport: "Passeport",
        visa: "Visa",
        insurance: "Assurance voyage",
      };
      const message = req.query.message ? "Document ajouté avec succès." : null;
      res.render("admin/document/addRequiredDocumentsForm", {
        title: "Document requis",
        travels: travels,
        id_travel: id_travel,
        documents: documents,
        error: req.query.error,
        message: message,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      res.render("admin/document/addRequiredDocumentsForm", {
        title: "Document requis",
        travels: [],
        id_travel: req.params.id_travel,
        error:
          "Erreur lors de la récupération des documents : " + error.message,
        message: null,
      });
    }
  };

  addRequiredDocuments = async (req, res) => {
    try {
      const { id_travel } = req.params;

      await this.documentService.addRequiredDocuments(
        id_travel,
        req.body.document
      );

      res.redirect(`/admin/document/${id_travel}?message=true`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du document :", error);
      res.redirect(
        `/admin/document/${req.params.id_travel}?error=${encodeURIComponent(
          error.message
        )}`
      );
    }
  };

  getDocumentsForRegistration = async (req, res) => {
    try {
      const { id_registration } = req.params;
      if (!id_registration) {
        return res.status(400).json({ error: "ID d'inscription manquant" });
      }

      const registrations =
        await this.documentService.getDocumentsByRegistrationId(
          id_registration
        );

      return res.render("document/form", {
        title: "Étape 2 - Documents requis",
        registration: registrations,
        travel: registrations.id_travel,
        user: req.user,
        success:
          req.query.success === "inscription" ? "Inscription réussie !" : null,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      res.status(500).json({
        error:
          "Erreur lors de la récupération des documents : " + error.message,
      });
    }
  };

  uploadDocuments = async (req, res) => {
    try {
      const { id_registration } = req.params;
      const id_user = req.user._id;

      if (!id_registration) {
        return res.status(400).json({ error: "ID d'inscription manquant" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Aucun fichier téléchargé" });
      }

      const documentsToSave = [];

      req.files.forEach((file) => {
        const documentType = file.fieldname.replace("file_", "");
        const urlFromPath = file.path.split("uploads").pop();
        const url = `/uploads${urlFromPath.replace(/\\/g, "/")}`;
        documentsToSave.push({
          id_registration: id_registration,
          id_user: id_user,
          type: documentType,
          url: url,
        });
      });

      await this.documentService.saveDocuments(documentsToSave);

      return res.redirect(`/payment/${id_registration}`);
    } catch (error) {
      console.error("Erreur lors de l'upload des documents:", error);
      return res.status(500).json({
        error: "Erreur lors de l'upload des documents : " + error.message,
      });
    }
  };

  showDocumentsForUser = async (req, res) => {
    try {
      const { id_registration } = req.params;
      const registration =
        await this.documentService.getDocumentsByRegistrationId(
          id_registration
        );
      const { documents } = registration;

      return res.render("document/show", {
        title: "Vos documents",
        documents: documents,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      return res.status(500).json({
        error:
          "Erreur lors de la récupération des documents : " + error.message,
      });
    }
  };

  getAllDocumentsForTravel = async (req, res) => {
    try {
      const { id_travel } = req.params;
      if (!id_travel) {
        return res.status(400).json({ error: "ID de voyage manquant" });
      }

      const documents = await this.documentService.getAllDocumentsByTravelId(
        id_travel
      );

      return res.render("admin/document/travelsDocuments", {
        title: "Documents du voyage",
        documents: documents.documents,
        travel: documents.travel,
        registrations: documents.registrations,
        id_travel: id_travel,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des documents :", error);
      return res.status(500).json({
        error:
          "Erreur lors de la récupération des documents : " + error.message,
      });
    }
  };
}
module.exports = new DocumentController();
