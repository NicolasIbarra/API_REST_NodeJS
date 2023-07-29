const { matchedData } = require("express-validator");
const { encryptPassword } = require("../utils/handlePassword");
const { signToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

/**
 * Register a new user.
 * encryptPassword() -> For encrypting users' passwords.
 * Body -> Takes the users data and then it's password property is modified with a new hashed password.
 * signToken() -> Creates a token with user information.
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  req = matchedData(req);
  const hashedPassword = await encryptPassword(req.password);
  const body = { ...req, password: hashedPassword };
  const dataUser = await usersModel.create(body);
  const data = {
    token: await signToken(dataUser),
    user: dataUser,
  };
  res.send({ data });
};

module.exports = { registerUser };
