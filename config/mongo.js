const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("**** SUCCESSFUL CONNECTION TO MONGO ****");
  } catch {
    console.log("**** UNSUCCESSFUL CONNECTION TO MONGO ****");
  }
};

module.exports = connectMongoDB;
