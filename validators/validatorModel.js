const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

/**
 * Validator used for Tracks model.
 * validatorCreateItems -> Array that validates every property of Tracks model.
 * Check -> Express function to validate data in different ways.
 */
const validatorTracksModel = [
  check("name").exists().notEmpty(),
  check("album").exists().notEmpty(),
  check("cover").exists().notEmpty(),
  check("artist").exists().notEmpty(),
  check("artist.name").exists().notEmpty(),
  check("artist.nickname").exists().notEmpty(),
  check("artist.nationality").exists().notEmpty(),
  check("duration").exists().notEmpty(),
  check("duration.start").exists().notEmpty(),
  check("duration.end").exists().notEmpty(),
  check("mediaId").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

/**
 * Validator used for Users model.
 */
const validatorUsersModel = [
  check("name").exists().notEmpty().isLength({ min: 4, max: 20 }),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 50 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validatorTracksModel, validatorUsersModel };
