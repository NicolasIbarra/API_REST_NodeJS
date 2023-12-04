const { storageModel } = require("../../models/index");

const findOneById = async (id) => {
    const response = await storageModel.findOne({ _id: { $eq: id }});
    return response;
};

const findAll = async () => {
    const response = await storageModel.find({});
    return response;
}

const createFile = async (fileData) => {
    const response = await storageModel.create(fileData);
    return response;
}

const deleteFile = async (id) => {
    const response = await storageModel.findByIdAndDelete(id);
    return response;
}

module.exports = { findOneById, findAll, createFile, deleteFile };
