const { matchedData } = require("express-validator");
const { tracksServices } = require("../services/index");
const { handleHttpError } = require("../utils/handleErrors");

/**
 * Gets an item.
 * matchedData() was used in this GET endpoint, but for some reason it clears the request data.
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const data = await tracksServices.findOneById(itemId);
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
    const data = await tracksServices.findAll();
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
    const data = await tracksServices.createTrack(body); //Check for all CRUD controllers methods. They may change when using Sequelize for SQL DB.
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
    req = matchedData(req);
    const body = {...req};
    const data = await tracksServices.updateOneById(body);
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
    const data = await tracksServices.deleteTrack(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_TRACKS_DELETEITEM", 404);
  }
};

module.exports = { getItem, getItems, createItems, updateItems, deleteItems };
