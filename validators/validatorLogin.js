const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

/**
 * Validates the email and password from a new user.
 */
const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = validatorLogin;
