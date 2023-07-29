const express = require("express");
const { registerUser } = require("../controllers/users");
const { validatorUsersModel } = require("../validators/validatorModel");
const router = express.Router();

/**
 * Register a new user
 */
router.post("/register", validatorUsersModel, registerUser);

module.exports = router;
