const fs = require("fs");
const { storageServices } = require("../services/index");
const { handleHttpError } = require("../utils/handleErrors");
const { matchedData } = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Gets a file from DB
 * @param {*} req
 * @param {*} res
 */
const getFile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await storageServices.findOneById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_STORAGE_GETFILE", 404);
  }
};

/**
 * Gets a list of files.
 * @param {*} req
 * @param {*} res
*/
const getFiles = async (req, res) => {
  try {
    const files = await storageServices.findAll();
    res.send({ files });
  } catch (error) {
    handleHttpError(res, "ERROR_STORAGE_GETFILES", 404);
  }
};

/**
 * Upload a file to the DB.
 * req.body -> Empty.
 * req.file -> All metadata from file.
 * fileData -> Contains the model structure of Storage entity to be created in the DB.
 * @param {*} req
 * @param {*} res
 */
const uploadFile = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };
    const data = await storageServices.createFile(fileData);
    res.send({ data: data });
  } catch (error) {
    handleHttpError(res, "ERROR_STORAGE_UPLOADFILE", 404);
  }
};

/**
 * Deletes a file from the DB.
 * -> First, the file is found in DB.
 * -> Second, it's name is destructured from Mongo response.
 * -> Third, the filePath is created by concatenating routes.
 * UnlinkSync() is used to delete the file locally.
 * @param {*} req
 * @param {*} res
 */
const deleteFile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const fileData = await storageServices.findOneById(id);
    await storageServices.deleteFile(id);
    const { filename } = fileData;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);
    const data = {
      filePath,
      delete: 1,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_STORAGE_DELETEFILE", 404);
  }
};

module.exports = { getFile, getFiles, uploadFile, deleteFile };
