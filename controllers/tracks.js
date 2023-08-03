const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleErrors");
const getPropertiesKey = require("../utils/handleEngineProperties");
const propertiesKey = getPropertiesKey();

/**
 * Gets an item.
 * matchedData() was used in this GET endpoint, but for some reason it clears the request data.
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_GETITEM", 404);
  }
};

/**
 * Gets a list of items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await tracksModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_GETITEMS", 404);
  }
};

/**
 * Creates an item in DB.
 * matchedData -> Prevents the users from sending an incorrect JSON structure in HTTP request.
 *                It takes only the real keys with their values.
 * @param {*} req
 * @param {*} res
 */
const createItems = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body); //Check for all CRUD controllers methods. They may change when using Sequelize for SQL DB.
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_CREATEITEMS", 404);
  }
};

/**
 * Updates an item.
 * findOneAndUpdate -> Takes the id of the track to modify and the body with the new data as arguments.
 *                  -> The ID sent must be an object. 
 * @param {*} req
 * @param {*} res
 */
const updateItems = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.findOneAndUpdate({mediaId:body.mediaId}, body, { update: true });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_UPDATEITEMS", 404);
  }
};

/**
 * Deletes an item from the DB
 * @param {*} req
 * @param {*} res
 */
const deleteItems = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await tracksModel.delete({ [propertiesKey.id]: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_DELETEITEM", 404);
  }
};

module.exports = { getItem, getItems, createItems, updateItems, deleteItems };
