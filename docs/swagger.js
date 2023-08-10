const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Constant that has general but relevant API information.
 * It's used by swaggerJsdoc() function.
 */
const swaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "REST API ",
    description: "Hi there, this is the first REST API using Swagger I've ever created.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
    },
  ],
};

/**
 * The options constante has all the information that will be used to
 * create the Swagger documentation.
 * options.swaggerDefinition -> Establishes API information, like title,
 *                           -> or description.
 * options.apis -> Contains the path of the routes of the project and
 *              -> looks for every .js file.
 */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfiguration = swaggerJsdoc(options);

module.exports = openApiConfiguration;
