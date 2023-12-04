const express = require("express");
const { deleteUserByEmail, getUserByEmail, getUserById, getAllUsers, updateUserByEmail } = require("../controllers/users");
const authSessionMiddleware = require("../middleware/sessionMiddleware");
const validatorEmail = require("../validators/validatorEmail");
const validatorId = require("../validators/validatorId");
const { validatorUsersModel } = require("../validators/validatorModel");
const router = express.Router();

/**
 * Get a single user by email.
 * @openapi
 * /users/getUserByEmail/{email}:
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
router.get("/getUserByEmail/:email", authSessionMiddleware, validatorEmail, getUserByEmail);

/**
 * Get a single user by id.
 * @openapi
 * /users/getUserById/{id}:
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
router.get("/getUserById/:id", authSessionMiddleware, validatorId, getUserById);

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

/**
 * Delete a user by its email.
 * @openapi
 * /users/{email}:
 *      delete:
 *          tags:
 *              - Users
 *          summary: "Delete a user"
 *          description: "Endpoint to delete a user by its email"
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
 *                  description: Users recovered successfully
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token not found
 */
router.delete("/:email", authSessionMiddleware, validatorEmail, deleteUserByEmail);

/**
 * Update one particular user
 * @openapi
 * /users/updateUserByEmail:
 *      put:
 *          tags:
 *              - Users
 *          summary: "Update user"
 *          description: "Endpoint to update one particular user by its email"
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/users"
 *          responses:
 *              '200':
 *                  description: User updated successfully
 *              '400':
 *                  description: Bad request
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token or track not found
 */
router.put("/updateUserByEmail", authSessionMiddleware, validatorUsersModel, updateUserByEmail);

module.exports = router;
