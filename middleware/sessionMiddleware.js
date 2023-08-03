const getPropertiesKey = require("../utils/handleEngineProperties");
const { handleHttpError } = require("../utils/handleErrors");
const { usersModel } = require("../models");
const { verifyToken } = require("../utils/handleJwt");
const propertiesKey = getPropertiesKey();

/**
 * Middleware to verify the token sent in a request.
 * First it checks if an authorization header was properly sent.
 * Second it get the token from the request and verifies it.
 * Third it looks for the user that made the request and adds it to the request body
 *  -> so it can be accessible through the app to improve traceability.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authSessionMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "ERROR_TOKEN_NOT_FOUND", 404);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken[propertiesKey.id]) {
      handleHttpError(res, "ERROR_NOT_TOKEN_ID_FOUND", 404);
      return;
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    const user = await usersModel.findOne(query); //This should be a microservice.
    req.user = user;
    next();

  } catch (error) {
    handleHttpError(res, "ERROR_AUTH_SESSION_MIDDLEWARE", 404);
  }
};

module.exports = authSessionMiddleware;
