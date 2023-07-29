const bcryptjs = require("bcryptjs");

/**
 * Encrypts the password written by user.
 * The second parameter of hash() represents randomness.
 * @param {*} plainPassword 
 */
const encryptPassword = async (plainPassword) => {
  return await bcryptjs.hash(plainPassword, 10);
};

/**
 * Validates password written by user with hashed password.
 * @param {*} plainPassword 
 * @param {*} hashedPassword 
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcryptjs.compare(plainPassword, hashedPassword);
};

module.exports = { encryptPassword, comparePassword };
