require("dotenv").config(); // This line lets the variables in .env file to be read.

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/mongo");

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json()); // This line lets the proyect to receive responses with JSON format.
app.use(express.static("storage")); // This line grants the direct access from URL to Storage images.

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log("Tu app está escuchando http://localhost:" + port);
});

connectDatabase();
