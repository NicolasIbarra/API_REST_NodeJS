const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

/**
 * Configure a new instance of DB connection.
 */
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

/**
 * Stablish the connection with MySQL DB.
 */
const connectMySQLDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("**** SUCCESSFUL CONNECTION TO MYSQL ****");
  } catch (error) {
    console.log("**** UNSUCCESSFUL CONNECTION TO MYSQL ****");
  }
};

module.exports = { sequelize, connectMySQLDB };
