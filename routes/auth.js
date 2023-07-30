const express = require("express");
const { registerUser, loginUser } = require("../controllers/users");
const { validatorUsersModel } = require("../validators/validatorModel");
const validatorLogin = require("../validators/validatorLogin");
const router = express.Router();

/**
 * Register a new user.
 */
router.post("/register", validatorUsersModel, registerUser);

/**
 * Log in an existing user.
 */
router.post("/login", validatorLogin, loginUser);

module.exports = router;
