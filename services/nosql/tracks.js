const { tracksModel } = require("../../models/index");

const findOneById = async (id) => {
    const response = await tracksModel.findOne({ _id: { $eq: id }});
    return response;
};

const findAll = async () => {
    const response = await tracksModel.find({});
    return response;
}

const createTrack = async (trackData) => {
    const response = await tracksModel.create(trackData);
    return response;
}

const updateOneById = async (body) => {
    const response = await tracksModel.findOneAndUpdate({ _id: body.id }, body, { new: true });
    return response;
}

const deleteTrack = async (id) => {
    const response = await tracksModel.delete({ _id: { $eq: id }});
    return response;
}

module.exports = { findOneById, findAll, createTrack, updateOneById, deleteTrack }