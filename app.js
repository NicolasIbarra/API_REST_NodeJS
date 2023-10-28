require("dotenv").config(); // This line lets the variables in .env file to be read.

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const connectMongoDB = require("./config/mongo");
const { connectMySQLDB } = require("./config/mysql");
const openApiConfiguration = require("./docs/swagger");

const DB_ENGINE = process.env.DB_ENGINE;
const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 3000;
const APP = express();
APP.use(cors());

/**
 * Json() lets the proyect to receive responses with JSON format.
 */
APP.use(express.json());

/**
 * Static() grants the direct access from URL to Storage images.
 */
APP.use(express.static("storage")); 

/**
 * Creation of route for Swagger.
 * Serve -> Handlers for serving Swagger UI files.
 * Setup() -> Middleware that returns an HTML file for the Swagger page.
 */
APP.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfiguration)
);

/**
 * Establishes the first part of routes URL link.
 * Starting with "/api" and continuing with an specific route.
 */
APP.use("/api", require("./routes"));

/**
 * An enviroment control is made because of Jest testing server (supported with cross-env dependency).
 * Listens to localhost connection.
 */
if(NODE_ENV !== "test"){
  APP.listen(PORT, () => {
    console.log("Tu app está escuchando http://localhost:" + PORT);
  });
}

/**
 * Evaluates which DB connect to according to DB_ENGINE constant in .env file.
 */
DB_ENGINE === "nosql" ? connectMongoDB() : connectMySQLDB();

module.exports = APP;