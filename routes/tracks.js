const express = require("express");
const { getItems, createItems, getItem, updateItems, deleteItems } = require("../controllers/tracks");
const authSessionMiddleware  = require("../middleware/sessionMiddleware");
const checkRolMiddleware = require("../middleware/rolMiddleware");
const validatorId = require("../validators/validatorId");
const { validatorTracksModel } = require("../validators/validatorModel");
const router = express.Router();

/**
 * Get all tracks existing in DB.
 * @openapi
 * /tracks:
 *      get:
 *          tags:
 *              - Tracks
 *          summary: "All tracks"
 *          description: "Endpoint to get all existing tracks"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200': 
 *                  description: Tracks recovered successfully
 *              '403': 
 *                  description: Validation error 
 *              '404': 
 *                  description: Token not found 
 */
router.get("/", authSessionMiddleware, getItems);

/**
 * Get one particular track
 * @openapi
 * /tracks/{id}:
 *      get:
 *          tags:
 *              - Tracks
 *          summary: "Get track"
 *          description: "Endpoint to get one particular track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the track
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200': 
 *                  description: Tracks recovered successfully
 *              '403': 
 *                  description: Validation error 
 *              '404': 
 *                  description: Token not found 
 */
router.get("/:id", authSessionMiddleware, validatorId, getItem);

/**
 * Update one particular track. NOT WORKING in Swagger
 * @openapi
 * /tracks/{id}:
 *      put:
 *          tags:
 *              - Tracks
 *          summary: "Update track"
 *          description: "Endpoint to update one particular track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the track
 *              required: true
 *              schema:
 *                  type: string
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/tracks"
 *          responses:
 *              '200':
 *                  description: Track updated successfully
 *              '400':
 *                  description: Bad request
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token or track not found
 */
router.put("/:id", authSessionMiddleware, validatorId, validatorTracksModel, updateItems);

/**
 * Post a new track.
 * Only "admin" is sent as an allowed rol to execute a POST method.
 * @openapi
 * /tracks:
 *      post:
 *          tags:
 *              - Tracks
 *          summary: "Post track"
 *          description: "Endpoint to post a new track"
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/tracks"
 *          responses:
 *              '200':
 *                  description: Track posted successfully
 *              '400':
 *                  description: Bad request
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token or track not found
 */
router.post("/", authSessionMiddleware, checkRolMiddleware(["admin","user"]), validatorTracksModel, createItems);

/**
 * Delete a track
 * @openapi
 * /tracks/{id}:
 *      delete:
 *          tags:
 *              - Tracks
 *          summary: "Delete track"
 *          description: "Endpoint to delete one particular track"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the track
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Track deleted successfully
 *              '400':
 *                  description: Bad request
 *              '403':
 *                  description: Validation error
 *              '404':
 *                  description: Token or track not found
 */
router.delete("/:id", authSessionMiddleware, validatorId, deleteItems);

module.exports = router;
