const { body, param } = require("express-validator");

const createTravelValidator = [
  body("depart")
    .notEmpty()
    .withMessage("depart is required")
    .isLength({ max: 20 })
    .withMessage("depart must be less than 20 characters"),
  body("destination")
    .notEmpty()
    .withMessage("Destination is required")
    .isLength({ max: 20 })
    .withMessage("Destination must be less than 20 characters"),
  body("start_date")
    .notEmpty()
    .withMessage("Start date is required")
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a valid date"),
  body("end_date")
    .notEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .toDate()
    .withMessage("End date must be a valid date"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("places")
    .notEmpty()
    .withMessage("Number of places is required")
    .isInt({ min: 1 })
    .withMessage("Number of places must be a positive integer"),
  body("status").optional().isIn(["available", "booked", "canceled"]),
  body("documents_required")
    .optional()
    .isArray()
    .withMessage("Documents required must be an array"),
];

const updateTravelValidator = [
  param("id")
    .notEmpty()
    .withMessage("Travel ID is required")
    .isMongoId()
    .withMessage("Invalid Travel ID format"),
  body("depart")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Depart must be less than 20 characters"),
  body("destination")
    .optional()
    .isLength({ max: 20 })
    .withMessage("Destination must be less than 20 characters"),
  body("startDate").optional().isISO8601().toDate(),
  body("endDate").optional().isISO8601().toDate(),
  body("price").optional().isNumeric(),
  body("places").optional().isInt({ min: 1 }),
  body("status").optional().isIn(["available", "booked", "canceled"]),
];

module.exports = {
  createTravelValidator,
  updateTravelValidator,
};
