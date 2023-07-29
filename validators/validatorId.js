const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

/**
 * Validator used for Id's.
 */
const validatorId = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => validateResult(req.params.id, res, next),
];

module.exports = validatorId;
