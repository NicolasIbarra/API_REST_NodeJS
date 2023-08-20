const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const validatorId = require("../validators/validatorId");
const { getFile, getFiles, uploadFile, deleteFile } = require("../controllers/storage");
const router = express.Router();

/**
 * uploadMiddleware tells the POST method to receive a single file using its key ("myFile").
 * If you want to send several files, use the multi function.
 * @openapi
 * /storage:
 *      post:
 *          tags:
 *              - Storage
 *          summary: "New file"
 *          description: "Endpoint to post a new file"
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              myFile:
 *                                  type: string
 *                                  format: binary
 *          responses:
 *              '200': 
 *                  description: File posted successfully
 *              '403': 
 *                  description: Validation error
 *              '404': 
 *                  description: Token not found
 */
router.post("/", uploadMiddleware.single("myFile"), uploadFile);

/**
 * Get all the files from DB.
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - Storage
 *          summary: "Get files"
 *          description: "Endpoint to get all files from database"
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200': 
 *                  description: File recovered successfully
 *              '403': 
 *                  description: Validation error
 *              '404': 
 *                  description: Token not found
 */
router.get("/", getFiles);

/**
 * Get a particular file from DB. NOT WORKING for now.
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - Storage
 *          summary: "Get file"
 *          description: "Endpoint to get an existing file"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the file
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200': 
 *                  description: File posted successfully
 *              '403': 
 *                  description: Validation error
 *              '404': 
 *                  description: Token not found
 */
router.get("/:id", validatorId, getFile);

/**
 * Delete a particular file from DB. NOW WORKING for now.
 * @openapi
 * /storage/{id}:
 *      delete:
 *          tags:
 *              - Storage
 *          summary: "Delete file"
 *          description: "Endpoint to delete an existing file"
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          -   name: id
 *              in: path
 *              description: Identifier of the file
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '200': 
 *                  description: File deleted successfully
 *              '403': 
 *                  description: Validation error
 *              '404': 
 *                  description: Token not found
 */
router.delete("/:id", validatorId, deleteFile); 

module.exports = router;
