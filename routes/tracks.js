const express = require("express");
const { getItems, createItems, getItem, updateItems, deleteItems } = require("../controllers/tracks");
const validatorId = require("../validators/validatorId");
const { validatorTracksModel } = require("../validators/validatorModel");
const customHeader = require("../middleware/customHeader");
const router = express.Router();

router.get("/", getItems);
router.get("/:id", validatorId, getItem);
router.put("/:id", validatorId, validatorTracksModel, updateItems);
router.post("/", validatorTracksModel, createItems);
router.delete("/:id", validatorId, deleteItems);

module.exports = router;
