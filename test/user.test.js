const userRepository = require("../repository/userRepository");
const userService = require("../service/userService");

jest.mock("../repository/userRepository");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should return user data for a valid user ID", async () => {
      const userId = "user123";
      const mockUser = {
        _id: userId,
        email: "test@mail.com",
        firstname: "John",
        lastname: "Doe",
        roles: "member",
        phone: "1234567890",
      };
      userRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.getUserById(userId);

      expect(result).toEqual(mockUser);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });
    it("should throw an error if user ID is invalid", async () => {
      const invalidUserId = "invalidUserId";
      userRepository.findById.mockResolvedValue(null);

      await expect(userService.getUserById(invalidUserId)).rejects.toThrow(
        "User not found"
      );
      expect(userRepository.findById).toHaveBeenCalledWith(invalidUserId);
    });
  });

  describe("updateUser", () => {
    it("should update user data for a valid user ID", async () => {
      const userId = "user123";
      const userData = {
        email: "test@mail.com",
        firstname: "John",
        lastname: "Doe",
        roles: "member",
        phone: "1234567890",
      };
      const updatedUser = {
        _id: userId,
        ...userData,
      };

      userRepository.findByIdAndUpdate.mockResolvedValue(updatedUser);
      const result = await userService.updateUser(userId, userData);

      expect(result).toEqual(updatedUser);
      expect(userRepository.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        userData
      );
    });
    it("should throw an error if user ID is invalid", async () => {
      const invalidUserId = "invalidUserId";
      const userData = {
        email: "test@mail.com",
        firstname: "John",
        lastname: "Doe",
        roles: "member",
        phone: "1234567890",
      };
      userRepository.findByIdAndUpdate.mockResolvedValue(null);
      await expect(
        userService.updateUser(invalidUserId, userData)
      ).rejects.toThrow("User not found");
      expect(userRepository.findByIdAndUpdate).toHaveBeenCalledWith(
        invalidUserId,
        userData
      );
    });
  });
});
