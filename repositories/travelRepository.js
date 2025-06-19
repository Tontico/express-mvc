const Travel = require("../model/travels");

class travelRepository {
  constructor() {
    this.travel = Travel;
  }

  async findAll() {
    return this.travel.find({
      status: "available",
    });
  }

  async findById(id) {
    return this.travel.findById(id);
  }

  async create(travelData) {
    return this.travel.create(travelData);
  }

  async update(travelData, id) {
    return this.travel.updateOne({ _id: id }, travelData);
  }

  async delete(id) {
    return this.travel.findByIdAndDelete(id);
  }
}
module.exports = new travelRepository();
