const { validationResult } = require("express-validator");

const validate = (viewName) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      return res.status(400).render(viewName, {
        errors: errorMessages,
        formData: req.body,
        title: "Erreur de validation",
      });
    }
    next();
  };
};

module.exports = validate;
