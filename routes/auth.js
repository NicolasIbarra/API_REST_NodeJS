const express = require("express");
const { registerUser, loginUser } = require("../controllers/users");
const { validatorUsersModel } = require("../validators/validatorModel");
const validatorLogin = require("../validators/validatorLogin");
const router = express.Router();

/**
 * Register a new user.
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Register a new user"
 *          description: "Endpoint to register a new user."
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *              '200': 
 *                  description: User created successfully
 *              '403': 
 *                  description: Validation error 
 */
router.post("/register", validatorUsersModel, registerUser);

/**
 * Log in an existing user.
 */
router.post("/login", validatorLogin, loginUser);

module.exports = router;
