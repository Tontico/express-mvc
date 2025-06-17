const usersRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class authService {
  constructor() {
    this.usersRepository = usersRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  async register(data, response) {
    try {
      const { password, email, firstname, lastname, phone } = data;
      const existingUser = await this.usersRepository.findOne(email);
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await this.bcrypt.hash(password, 10);

      const newUser = await this.usersRepository.create({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone: phone.trim(),
      });
      if (!newUser) {
        throw new Error("User registration failed");
      }

      const token = this.generateToken(newUser);
      if (!token) {
        throw new Error("Token generation failed");
      }

      this.generateSecureCookie(response, token);

      newUser.token = token;
      return newUser;
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  }

  async login(email, password, response) {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await this.bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const token = this.generateToken(user);
      if (!token) {
        throw new Error("Token generation failed");
      }

      this.generateSecureCookie(response, token);

      user.token = token;

      return user;
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  generateToken(user) {
    try {
      const token = this.jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return token;
    } catch (error) {
      throw new Error("Token generation failed: " + error.message);
    }
  }
  generateSecureCookie(response, token) {
    const responseCookie = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    };
    response.cookie("token", token, responseCookie);
  }

  async verifyToken(token) {
    try {
      const decoded = this.jwt.verify(token, process.env.SECRET_KEY);
      const user = await this.usersRepository.findOne({
        where: { id: decoded.id },
      });
      return user || null;
    } catch (error) {
      throw new Error("Token verification failed: " + error.message);
    }
  }
}
module.exports = new authService();
