const { matchedData } = require("express-validator");
const { encryptPassword, comparePassword } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleErrors");
const { signToken } = require("../utils/handleJwt");
const { usersServices } = require("../services/index");

/**
 * Register a new user.
 * encryptPassword() -> For encrypting users' passwords.
 * Body -> Takes the users data and then it's password property is modified with a new hashed password.
 * signToken() -> Creates a token with user information.
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPassword = await encryptPassword(req.password);
    const body = { ...req, password: hashedPassword };
    const dataUser = await usersServices.createUser(body);
    res.send({ dataUser });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_REGISTERUSER", 404);
  }
};

/**
 * Login for an existing user.
 * First the user is retrieved from DB by its email.
 * Second the comparePassword() function is used to verify the entered password.
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersServices.findOneByEmail(req.email);
    if (!user) {
      handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
      return;
    }
    const hashedPassword = user.password;
    const matchesPassword = await comparePassword(req.password, hashedPassword);
    if (!matchesPassword) {
      handleHttpError(res, "ERROR_INCORRECT_PASSWORD", 401);
      return;
    }
    const data = {
      token: await signToken(user),
      user,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_LOGINUSER", 404);
  }
};

/**
 * Gets a single user by id
 * @param {*} req
 * @param {*} res
 */
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await usersServices.findOneById(userId);
    res.send({ user });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_FINDUSERBYID", 404);
  }
};

/**
 * Gets a single user by email
 * @param {*} req
 * @param {*} res
 */
const getUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await usersServices.findOneByEmail(userEmail);
    res.send({ user });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_FINDUSERBYEMAIL", 404);
  }
};

/**
 * Gets a list of all the existing users
 * @param {*} req
 * @param {*} res
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await usersServices.findAll();
    res.send({ users });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_FINDALLUSERS", 404);
  }
};

/**
 * Updates a user by its email.
 * @param {*} req 
 * @param {*} res 
 */
const updateUserByEmail = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPassword = await encryptPassword(req.password);
    const body = { ...req, password: hashedPassword };
    const data = await usersServices.updateOneByEmail(body);
    res.send({data});
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_UPDATEUSERSBYEMAIL", 404);
  }
};

/**
 * Deletes a single user by its email
 * @param {*} req
 * @param {*} res
 */
const deleteUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const data = await usersServices.deleteUser(userEmail);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_USERS_DELETEUSERBYEMAIL", 404);
  }
};

module.exports = {
  deleteUserByEmail,
  getAllUsers,
  getUserByEmail,
  getUserById,
  loginUser,
  registerUser,
  updateUserByEmail
};
