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
 *          summary: "Register"
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
 * Login for an existing user.
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          summary: "Log in"
 *          description: "Endpoint to login of an existing user"
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authLogin"
 *          responses:
 *              '200': 
 *                  description: User logged in successfully
 *              '401':
 *                  description: Incorrect password
 *              '403': 
 *                  description: Validation error
 *              '404': 
 *                  description: User not found 
 */
router.post("/login", validatorLogin, loginUser);

module.exports = router;
