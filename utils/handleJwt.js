const getPropertiesKey = require("../utils/handleEngineProperties");
const jsonWebToken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const propertiesKey = getPropertiesKey();

/**
 * Creates a token with user information.
 * User -> An User object with it's information is needed.
 * Sign() function requires a payload, a secret key and an expiration time.
 * @param {*} user
 * @returns
 */
const signToken = async (user) => {
  try {
    const sign = await jsonWebToken.sign(
      {
        [propertiesKey.id]: user[propertiesKey.id],
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    return sign;
  } catch (error) {
    return "ERROR_SIGNING_TOKEN";
  }
};

/**
 * Verifies the token.
 * The created token and a secret key are needed.
 * @param {*} jwt
 * @returns
 */
const verifyToken = async (jwt) => {
  try {
    return await jsonWebToken.verify(jwt, JWT_SECRET);
  } catch (error) {
    return "ERROR_VERIFYING_TOKEN";
  }
};

module.exports = { signToken, verifyToken };
