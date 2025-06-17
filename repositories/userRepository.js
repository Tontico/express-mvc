const users = require("../model/users");

class userRepository {
  constructor() {
    this.users = users;
  }

  async findOne(option) {
    return this.users.findOne(option);
  }

  async create(userData) {
    return this.users.create(userData);
  }
}
module.exports = new userRepository();
