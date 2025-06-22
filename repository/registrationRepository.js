const registration = require("../model/registrations");
class RegistrationRepository {
  constructor() {
    this.registration = registration;
  }

  async create(registrationData) {
    return await this.registration.create(registrationData);
  }
  async findById(id) {
    return await this.registration
      .findById(id)
      .populate("id_travel")
      .populate("id_user");
  }
  async findAll() {
    return await this.registration.find();
  }

  async findByUserId(id_user) {
    return await this.registration.find({ id_user }).populate("id_travel");
  }
  async findByTravelId(id_travel) {
    return await this.registration.find({ id_travel }).populate("id_user");
  }
  async update(id, registrationData) {
    return await this.registration.findByIdAndUpdate(id, registrationData, {
      new: true,
    });
  }
  async findByUserIdAndTravelId(id_user, id_travel) {
    return await this.registration
      .findOne({ id_user, id_travel })
      .populate("id_travel")
      .populate("id_user");
  }

  async delete(id) {
    return await this.registration.findByIdAndDelete(id);
  }
  async countInscriptionByTravelId(travelId) {
    return await this.registration.countDocuments({
      id_travel: travelId,
    });
  }
  async findByRegistrationId(id_registration) {
    return await this.registration
      .findById({ _id: id_registration })
      .populate("id_travel")
      .populate("documents");
  }
}
module.exports = new RegistrationRepository();
