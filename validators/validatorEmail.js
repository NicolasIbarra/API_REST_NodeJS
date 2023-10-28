const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

/**
 * Validator used for emails.
 */
const validatorEmail = [
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => validateResult(req.params.email, res, next),
];

module.exports = validatorEmail;
