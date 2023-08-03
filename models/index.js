const DB_ENGINE = process.env.DB_ENGINE;
const modelsType = (DB_ENGINE === "nosql") ? "./nosql" : "./mysql";

const models = {
  usersModel: require(`${modelsType}/users`),
  tracksModel: require(`${modelsType}/tracks`),
  storageModel: require(`${modelsType}/storage`),
};

module.exports = models;
