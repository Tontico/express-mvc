const Travel = require("../model/travels");

class travelRepository {
  constructor() {
    this.travel = Travel;
  }

  async findAll() {
    return this.travel.find();
  }
  async findAllAvailable() {
    return this.travel.find({ status: "available" });
  }

  async findById(id) {
    return this.travel.findById({ _id: id });
  }

  async create(travelData) {
    return this.travel.create(travelData);
  }

  async update(id, travelData) {
    return this.travel.findByIdAndUpdate(id, travelData);
  }

  async delete(id) {
    return this.travel.findByIdAndDelete(id);
  }

  async sortSixTravels() {
    return this.travel
      .find({ status: "available" })
      .limit(6)
      .sort({ createdAt: -1 });
  }

  async addRequiredDocument(id, documentType) {
    return this.travel.findByIdAndUpdate(
      id,
      { $push: { documents_required: documentType } },
      { new: true }
    );
  }
}
module.exports = new travelRepository();
