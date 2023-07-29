const { validationResult } = require("express-validator");

/**
 * Function to validate the data.
 * validationResult -> Checks the data and goes to Catch if an error exists.
 * next() -> Return to controller.
 * Catch block -> Shows the error(s).
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

module.exports = validateResult;
