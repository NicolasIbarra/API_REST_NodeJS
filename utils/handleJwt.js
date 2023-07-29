const jsonWebToken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Creates a token with user information.
 * User -> An User object with it's information is needed.
 * Sign() function requires a payload, a secret key and an expiration time.
 * @param {*} user
 * @returns
 */
const signToken = async (user) => {
  const sign = await jsonWebToken.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "5h",
    }
  );
  return sign;
};

/**
 * Verifies the token.
 * The created token and a secret key are needed.
 * @param {*} jsonWebToken 
 * @returns 
 */
const verifyToken = async (jsonWebToken) => {
  try {
    return await jsonWebToken.verify(jsonWebToken, JWT_SECRET);
  } catch (error) {
    return "An error ocurred verifying the token";
  }
};

module.exports = { signToken, verifyToken };
