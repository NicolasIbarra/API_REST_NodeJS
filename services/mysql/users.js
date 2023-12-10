const { usersModel } = require("../../models");

const createUser = async (userData) => {
    const response = await usersModel.create(userData);
    return response;
}

const findOneByEmail = async (userEmail) => {
    const response = await usersModel.findAll({ where: { email: userEmail } });
    return response[0].dataValues;
};

const findOneById = async (userId) => {
    const response = await usersModel.findAll({ where: { id: userId }});
    return response[0].dataValues;
};

const findAll = async () => {
    const response = await usersModel.findAll();
    return response;
}

const updateOneByEmail = async (userBody) => {
    const response = await usersModel.update({ name: userBody.name, age: userBody.age, password: userBody.password }, { where: { email: userBody.email } });
    return response;
}   

const deleteUser = async (userEmail) => {
    const response = await usersModel.destroy({ where: { email: userEmail } });
    return response;
}

module.exports = { createUser, findOneByEmail, findOneById, findAll, updateOneByEmail, deleteUser }