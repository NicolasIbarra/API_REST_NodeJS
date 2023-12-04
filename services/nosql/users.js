const { usersModel } = require("../../models");

const createUser = async (userData) => {
    const response = await usersModel.create(userData);
    return response;
}

const findOneByEmail = async (email) => {
    const response = await usersModel.findOne({ email: { $eq: email } });
    return response;
};

const findOneById = async (id) => {
    const response = await usersModel.findOne({ _id: { $eq: id }});
    return response;
};

const findAll = async () => {
    const response = await usersModel.find({});
    return response;
}

const updateOneByEmail = async (body) => {
    const response = await usersModel.findOneAndUpdate({ email: body.email }, body, { new: true });
    return response;
}

const deleteUser = async (userEmail) => {
    const response = await usersModel.delete({ email: userEmail });
    return response;
}

module.exports = { createUser, findOneByEmail, findOneById, findAll, updateOneByEmail, deleteUser }