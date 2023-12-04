const DB_ENGINE = process.env.DB_ENGINE;
const servicesType = (DB_ENGINE === "nosql") ? "./nosql" : "./mysql";

const services = {
  usersServices: require(`${servicesType}/users`),
  tracksServices: require(`${servicesType}/tracks`),
  storageServices: require(`${servicesType}/storage`),
};

module.exports = services;