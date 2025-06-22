const { body, param } = require("express-validator");

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail()
    .escape(),
  body("password").escape(),
];

const registerValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .escape()
    .withMessage("First name must be less than 50 characters"),
  body("lastname")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50 })
    .escape()
    .withMessage("Last name must be less than 50 characters"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .escape()
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape()
    .matches(/[a-zA-Z0-9]/)
    .withMessage("Password must contain at least one number"),
];

module.exports = {
  loginValidator,
  registerValidator,
};
