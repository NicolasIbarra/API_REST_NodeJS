const { storageModel } = require("../../models");

const findOneById = async (storageId) => {
    const response = await storageModel.findAll({ where: { id: storageId } });
    return response[0].dataValues;
}

const findAll = async () => {
    const response = await storageModel.findAll();
    return response;
}

const createFile = async (fileData) => {
    const response = await storageModel.create(fileData);
    return response;
}

const deleteFile = async (storageId) => {
    const response = await storageModel.destroy({ where: { id: storageId } });
    return response;
}

module.exports = { findOneById, findAll, createFile, deleteFile }