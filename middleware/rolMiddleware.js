const { handleHttpError } = require("../utils/handleErrors");

/**
 * Checks the rol of the user.
 * @param {*} roles - An array of allowed roles.
 * @returns
 */
const checkRolMiddleware = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const userRole = user.role;
    const isUserAllowed = roles.some((currentRole) => userRole.includes(currentRole));
    if (!isUserAllowed) {
      handleHttpError(res, "ERROR_USER_NOT_ALLOWED", 403);
      return;
    }
    next();
  } catch (error) {
    handleHttpError(res, "ERROR_CHECKING_ROL_MIDDLEWARE", 404);
  }
};

module.exports = checkRolMiddleware;
