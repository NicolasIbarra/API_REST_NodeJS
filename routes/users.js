const express = require("express");
const { getUserByEmail, getUserById, getAllUsers } = require("../controllers/users");
const authSessionMiddleware = require("../middleware/sessionMiddleware");
const validatorEmail = require("../validators/validatorEmail");
const validatorId = require("../validators/validatorId");
const router = express.Router();

/**
 * Get a single user by email.
 * @openapi
 * /users/{email}:
 *      get:
 *          tags:
 *              - Users
 *          summary: "A single user by email"
 *          description: "Endpoint to get a single existing user"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: email
 *              in: path
 *              description: Email of the user
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: User recovered successfully
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: User not found
 */
router.get("/:email", authSessionMiddleware, validatorEmail, getUserByEmail);

/**
 * Get a single user by id.
 * @openapi
 * /users/{id}:
 *      get:
 *          tags:
 *              - Users
 *          summary: "A single user by id"
 *          description: "Endpoint to get a single existing user"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the user
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: User recovered successfully
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: User not found
 */
router.get("/:id", authSessionMiddleware, validatorId, getUserById);

/**
 * Get all users existing in DB.
 * @openapi
 * /users:
 *      get:
 *          tags:
 *              - Users
 *          summary: "All users"
 *          description: "Endpoint to get all existing users"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: Users recovered successfully
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token not found
 */
router.get("/", authSessionMiddleware, getAllUsers);

module.exports = router;
