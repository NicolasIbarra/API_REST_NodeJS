require("dotenv").config(); // This line lets the variables in .env file to be read.

const express = require("express");
const cors = require("cors");

const connectMongoDB = require("./config/mongo");
const { connectMySQLDB } = require("./config/mysql");

const DB_ENGINE = process.env.DB_ENGINE;
const PORT = process.env.PORT || 3000;
const APP = express();
APP.use(cors());
APP.use(express.json()); // This line lets the proyect to receive responses with JSON format.
APP.use(express.static("storage")); // This line grants the direct access from URL to Storage images.

APP.use("/api", require("./routes"));

APP.listen(PORT, () => {
  console.log("Tu app está escuchando http://localhost:" + PORT);
});

(DB_ENGINE === "nosql" ? connectMongoDB() : connectMySQLDB());
