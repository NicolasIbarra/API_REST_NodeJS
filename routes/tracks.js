const express = require("express");
const { getItems, createItems, getItem, updateItems, deleteItems } = require("../controllers/tracks");
const authSessionMiddleware  = require("../middleware/sessionMiddleware");
const checkRolMiddleware = require("../middleware/rolMiddleware");
const validatorId = require("../validators/validatorId");
const { validatorTracksModel } = require("../validators/validatorModel");
const router = express.Router();

/**
 * Get all tracks
 */
router.get("/", authSessionMiddleware, getItems);

/**
 * Get one track
 */
router.get("/:id", authSessionMiddleware, validatorId, getItem);

/**
 * Update one track
 */
router.put("/:id", authSessionMiddleware, validatorId, validatorTracksModel, updateItems);

/**
 * Post a new track.
 * Only "admin" is sent as an allowed rol to execute a POST method.
 */
router.post("/", authSessionMiddleware, checkRolMiddleware(["admin","user"]), validatorTracksModel, createItems);

/**
 * Delete a track
 */
router.delete("/:id", authSessionMiddleware, validatorId, deleteItems);

module.exports = router;
