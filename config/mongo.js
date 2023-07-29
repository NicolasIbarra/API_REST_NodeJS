const mongoose = require("mongoose");

const connectDatabase = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("**** CONEXIÓN EXITOSA ****");
  } catch {
    console.log("**** CONEXIÓN FALLIDA ****");
  }
};

module.exports = connectDatabase;
