const express = require("express");
const uploadMiddleware = require("../utils/handleStorage");
const validatorId = require("../validators/validatorId");
const { getFile, getFiles, uploadFile, deleteFile, updateFile } = require("../controllers/storage");
const router = express.Router();

/**
 * uploadMiddleware tells the POST method to receive a single file using its key ("myFile").
 * If you want to send several files, use the multi function.
 */
router.post("/", uploadMiddleware.single("myFile"), uploadFile);
router.get("/", getFiles);
router.get("/:id", validatorId, getFile);
router.delete("/:id", validatorId, deleteFile); 

module.exports = router;
