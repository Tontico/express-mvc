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

  async update(taskData, options) {
    return this.travel.update(taskData, options);
  }

  async destroy(options) {
    return this.travel.destroy(options);
  }
}
module.exports = new travelRepository();
