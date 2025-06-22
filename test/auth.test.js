const users = require("../model/users");
const authService = require("../service/authService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

jest.mock("../model/users");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("AuthService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("checkEmailExists", () => {
    it("should return true if email exists", async () => {
      const email = "test@mail.com";

      users.findOne.mockResolvedValue({ email: email });

      const result = await authService.checkEmailExists(email);

      expect(result).toBe(true);

      expect(users.findOne).toHaveBeenCalledWith({ email: email });
    });
    it("should return false if email does not exist", async () => {
      const email = "unknown@mail.com";

      users.findOne.mockResolvedValue(null);
      const result = await authService.checkEmailExists(email);
      expect(result).toBe(false);
      expect(users.findOne).toHaveBeenCalledWith({ email: email });
    });
  });
  describe("register", () => {
    it("should register a new user", async () => {
      const userData = {
        email: "newUser@email.com",
        password: "password123",
        firstname: "John",
        lastname: "Doe",
        roles: "member",
        phone: "1234567890",
      };

      const hashedPassword =
        "$2b$10$aCmI47P9yQeuMyNje2QU9OOCgatB0Fl19BEZEakpYHdc8VpWmyT0y";

      const dataDB = {
        email: "newUser@email.com",
        password: hashedPassword,
        firstname: "John",
        lastname: "Doe",
        phone: "1234567890",
      };
      
      const createdUser = {
        ...dataDB,
        _id: "user123",
        createdAt: new Date(),
      };

      const expectedResult = {
        ...createdUser,
        token: "mockedToken",
      };

      bcrypt.hash.mockResolvedValue(hashedPassword);
      users.create.mockResolvedValue(createdUser);
      jwt.sign.mockReturnValue("mockedToken");

      const result = await authService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);

      expect(users.create).toHaveBeenCalledWith(dataDB);

      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
    it("should throw an error if user already exists", async () => {
      const userData = {
        email: "test@mail.com",
        password: "password123",
        first_name: "John",
        last_name: "Doe",
        role: "member",
        phone: "1234567890",
      };
      users.findOne.mockResolvedValue({ email: userData.email });
      await expect(authService.register(userData)).rejects.toThrow(
        "User already exists"
      );
      expect(users.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(users.create).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
