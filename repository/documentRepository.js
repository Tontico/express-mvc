const documents = require("../model/documents");

class DocumentRepository {
  constructor() {
    this.documents = documents;
  }

  async create(documentData) {
    return await this.documents.create(documentData);
  }
  async findAllDocumentsByRegId(registrationIds) {
    return await this.documents
      .find({
        id_registration: { $in: registrationIds }, 
      })
      .populate("id_registration", "id_user") 
      .populate({
        path: "id_registration",
        populate: {
          path: "id_user",
          select: "firstname lastname email", 
        },
      });
  }
}
module.exports = new DocumentRepository();
