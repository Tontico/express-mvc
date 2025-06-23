const userRepository = require("../repository/userRepository");

class UserService {
  constructor() {
    this.userRepository = userRepository;
  }

  async getUserById(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  async updateUser(id, userData) {
    try {
      const updatedUser = await this.userRepository.findByIdAndUpdate(
        id,
        userData
      );
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }
}
module.exports = new UserService();
